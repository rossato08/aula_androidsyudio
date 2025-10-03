import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Modal
} from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function BookManagerApp() {
  const [db, setDb] = useState(null);
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState({
    id: null,
    title: '',
    author: '',
    publisher: '',
    price: ''
  });
  
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Inicializar banco de dados
  useEffect(() => {
    initDatabase();
  }, []);

  const initDatabase = async () => {
    try {
      const database = await SQLite.openDatabaseAsync('books.db');
      
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          publisher TEXT NOT NULL,
          price REAL NOT NULL
        );
      `);
      
      setDb(database);
      loadBooks(database);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao inicializar banco de dados: ' + error.message);
    }
  };

  // Carregar todos os livros
  const loadBooks = async (database = db) => {
    try {
      const allBooks = await database.getAllAsync('SELECT * FROM books ORDER BY title');
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar livros: ' + error.message);
    }
  };

  // Limpar formulário
  const clearForm = () => {
    setCurrentBook({
      id: null,
      title: '',
      author: '',
      publisher: '',
      price: ''
    });
  };

  // Validar campos
  const validateFields = () => {
    if (!currentBook.title.trim()) {
      Alert.alert('Erro', 'O campo Título é obrigatório!');
      return false;
    }
    if (!currentBook.author.trim()) {
      Alert.alert('Erro', 'O campo Autor é obrigatório!');
      return false;
    }
    if (!currentBook.publisher.trim()) {
      Alert.alert('Erro', 'O campo Editora é obrigatório!');
      return false;
    }
    if (!currentBook.price.trim()) {
      Alert.alert('Erro', 'O campo Preço é obrigatório!');
      return false;
    }
    
    const priceNum = parseFloat(currentBook.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Erro', 'Por favor, insira um preço válido!');
      return false;
    }
    
    return true;
  };

  // Cadastrar livro
  const handleRegister = async () => {
    if (!validateFields()) return;
    
    try {
      await db.runAsync(
        'INSERT INTO books (title, author, publisher, price) VALUES (?, ?, ?, ?)',
        [currentBook.title, currentBook.author, currentBook.publisher, parseFloat(currentBook.price)]
      );
      
      Alert.alert('Sucesso', 'Livro cadastrado com sucesso!');
      clearForm();
      loadBooks();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar livro: ' + error.message);
    }
  };

  // Abrir modal de consulta
  const handleSearch = () => {
    if (books.length === 0) {
      Alert.alert('Aviso', 'Não há livros cadastrados!');
      return;
    }
    setSearchTerm('');
    setFilteredBooks(books);
    setSearchModalVisible(true);
  };

  // Filtrar livros na consulta
  const filterBooks = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  // Abrir modal de atualização
  const handleUpdate = () => {
    if (books.length === 0) {
      Alert.alert('Aviso', 'Não há livros cadastrados para atualizar!');
      return;
    }
    setSearchTerm('');
    setFilteredBooks(books);
    clearForm();
    setUpdateModalVisible(true);
  };

  // Filtrar livros na atualização
  const filterBooksForUpdate = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  // Selecionar livro para atualizar
  const selectBookForUpdate = (book) => {
    setCurrentBook({
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      price: book.price.toString()
    });
  };

  // Atualizar livro
  const updateBook = async () => {
    if (!validateFields()) return;
    
    try {
      await db.runAsync(
        'UPDATE books SET title = ?, author = ?, publisher = ?, price = ? WHERE id = ?',
        [currentBook.title, currentBook.author, currentBook.publisher, parseFloat(currentBook.price), currentBook.id]
      );
      
      Alert.alert('Sucesso', 'Livro atualizado com sucesso!');
      setUpdateModalVisible(false);
      clearForm();
      loadBooks();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar livro: ' + error.message);
    }
  };

  // Abrir modal de remoção
  const handleDelete = () => {
    if (books.length === 0) {
      Alert.alert('Aviso', 'Não há livros cadastrados para remover!');
      return;
    }
    setSearchTerm('');
    setFilteredBooks(books);
    setDeleteModalVisible(true);
  };

  // Filtrar livros na remoção
  const filterBooksForDelete = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  // Deletar livro
  const deleteBook = async (bookId) => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente remover este livro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await db.runAsync('DELETE FROM books WHERE id = ?', [bookId]);
              Alert.alert('Sucesso', 'Livro removido com sucesso!');
              loadBooks();
              setFilteredBooks(filteredBooks.filter(book => book.id !== bookId));
            } catch (error) {
              Alert.alert('Erro', 'Erro ao remover livro: ' + error.message);
            }
          }
        }
      ]
    );
  };

  if (!db) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando banco de dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Cadastro de Livros</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={currentBook.title}
            onChangeText={(text) => setCurrentBook({...currentBook, title: text})}
            placeholder="Digite o título do livro"
          />

          <Text style={styles.label}>Autor *</Text>
          <TextInput
            style={styles.input}
            value={currentBook.author}
            onChangeText={(text) => setCurrentBook({...currentBook, author: text})}
            placeholder="Digite o nome do autor"
          />

          <Text style={styles.label}>Editora *</Text>
          <TextInput
            style={styles.input}
            value={currentBook.publisher}
            onChangeText={(text) => setCurrentBook({...currentBook, publisher: text})}
            placeholder="Digite o nome da editora"
          />

          <Text style={styles.label}>Preço (R$) *</Text>
          <TextInput
            style={styles.input}
            value={currentBook.price}
            onChangeText={(text) => setCurrentBook({...currentBook, price: text})}
            placeholder="Digite o preço"
            keyboardType="decimal-pad"
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar Livro</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonSecondary} onPress={handleSearch}>
              <Text style={styles.buttonText}>Consultar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSecondary} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
            <Text style={styles.buttonText}>Remover Livro</Text>
          </TouchableOpacity>

          {books.length > 0 && (
            <View style={styles.booksListContainer}>
              <Text style={styles.booksListTitle}>Livros Cadastrados ({books.length})</Text>
              {books.map((book) => (
                <View key={book.id} style={styles.bookCard}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookInfo}>Autor: {book.author}</Text>
                  <Text style={styles.bookInfo}>Editora: {book.publisher}</Text>
                  <Text style={styles.bookInfo}>Preço: R$ {book.price.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal de Consulta */}
      <Modal
        visible={searchModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Consultar Livros</Text>
            
            <TextInput
              style={styles.input}
              value={searchTerm}
              onChangeText={filterBooks}
              placeholder="Digite para filtrar por título"
            />

            <Text style={styles.resultCount}>
              {filteredBooks.length} {filteredBooks.length === 1 ? 'livro encontrado' : 'livros encontrados'}
            </Text>

            <ScrollView style={styles.resultsContainer}>
              {filteredBooks.map((book) => (
                <View key={book.id} style={styles.bookCard}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookInfo}>Autor: {book.author}</Text>
                  <Text style={styles.bookInfo}>Editora: {book.publisher}</Text>
                  <Text style={styles.bookInfo}>Preço: R$ {book.price.toFixed(2)}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.buttonSecondary} 
              onPress={() => setSearchModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Atualização */}
      <Modal
        visible={updateModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar Livro</Text>
            
            {!currentBook.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={searchTerm}
                  onChangeText={filterBooksForUpdate}
                  placeholder="Digite para filtrar por título"
                />

                <Text style={styles.resultCount}>
                  {filteredBooks.length} {filteredBooks.length === 1 ? 'livro encontrado' : 'livros encontrados'}
                </Text>

                <ScrollView style={styles.resultsContainer}>
                  {filteredBooks.map((book) => (
                    <TouchableOpacity 
                      key={book.id} 
                      style={styles.bookCard}
                      onPress={() => selectBookForUpdate(book)}
                    >
                      <Text style={styles.bookTitle}>{book.title}</Text>
                      <Text style={styles.bookInfo}>Autor: {book.author}</Text>
                      <Text style={styles.bookInfo}>Editora: {book.publisher}</Text>
                      <Text style={styles.bookInfo}>Preço: R$ {book.price.toFixed(2)}</Text>
                      <Text style={styles.selectText}>Toque para selecionar</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            ) : (
              <View>
                <Text style={styles.label}>Título *</Text>
                <TextInput
                  style={styles.input}
                  value={currentBook.title}
                  onChangeText={(text) => setCurrentBook({...currentBook, title: text})}
                />

                <Text style={styles.label}>Autor *</Text>
                <TextInput
                  style={styles.input}
                  value={currentBook.author}
                  onChangeText={(text) => setCurrentBook({...currentBook, author: text})}
                />

                <Text style={styles.label}>Editora *</Text>
                <TextInput
                  style={styles.input}
                  value={currentBook.publisher}
                  onChangeText={(text) => setCurrentBook({...currentBook, publisher: text})}
                />

                <Text style={styles.label}>Preço (R$) *</Text>
                <TextInput
                  style={styles.input}
                  value={currentBook.price}
                  onChangeText={(text) => setCurrentBook({...currentBook, price: text})}
                  keyboardType="decimal-pad"
                />

                <TouchableOpacity style={styles.buttonPrimary} onPress={updateBook}>
                  <Text style={styles.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.buttonSecondary} 
                  onPress={() => {
                    clearForm();
                    setFilteredBooks(books);
                  }}
                >
                  <Text style={styles.buttonText}>Voltar à Lista</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity 
              style={styles.buttonSecondary} 
              onPress={() => {
                setUpdateModalVisible(false);
                clearForm();
              }}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Remoção */}
      <Modal
        visible={deleteModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Remover Livro</Text>
            
            <TextInput
              style={styles.input}
              value={searchTerm}
              onChangeText={filterBooksForDelete}
              placeholder="Digite para filtrar por título"
            />

            <Text style={styles.resultCount}>
              {filteredBooks.length} {filteredBooks.length === 1 ? 'livro encontrado' : 'livros encontrados'}
            </Text>

            <ScrollView style={styles.resultsContainer}>
              {filteredBooks.map((book) => (
                <View key={book.id} style={styles.bookCard}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookInfo}>Autor: {book.author}</Text>
                  <Text style={styles.bookInfo}>Editora: {book.publisher}</Text>
                  <Text style={styles.bookInfo}>Preço: R$ {book.price.toFixed(2)}</Text>
                  
                  <TouchableOpacity 
                    style={styles.buttonDanger}
                    onPress={() => deleteBook(book.id)}
                  >
                    <Text style={styles.buttonText}>Remover Este Livro</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.buttonSecondary} 
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    color: '#333',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#5856D6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonDanger: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  booksListContainer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#ddd',
  },
  booksListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  resultCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  resultsContainer: {
    maxHeight: 300,
    marginVertical: 16,
  },
  bookCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  bookInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  selectText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 8,
    fontStyle: 'italic',
  },
});