import React, { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { View, TextInput, Button, StyleSheet, Text, Alert, FlatList } from "react-native";

const BookUpdate = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [form, setForm] = useState({
        title: '',
        author: '',
        publisher: ''
    });
    
    const db = useSQLiteContext();

    const searchBooks = async () => {
        try {
            const results = await db.getAllAsync(
                `SELECT * FROM books WHERE title LIKE ?;`,
                [`%${searchTerm}%`]
            );
            setBooks(results);
            setSelectedBook(null);
        } catch (error) {
            console.error(error);
            setBooks([]);
        }
    };

    const selectBookForUpdate = (book) => {
        setSelectedBook(book);
        setForm({
            title: book.title,
            author: book.author,
            publisher: book.publisher
        });
    };

    const updateBook = async () => {
        try {
            if (!selectedBook) return;
            
            if (!form.title || !form.author || !form.publisher) {
                throw new Error('Por favor, preencha todos os campos.');
            }

            await db.runAsync(
                `UPDATE books SET title = ?, author = ?, publisher = ? WHERE id = ?;`,
                [form.title, form.author, form.publisher, selectedBook.id]
            );

            Alert.alert('Sucesso', 'Livro atualizado com sucesso!');
            setSelectedBook(null);
            searchBooks(); // Atualiza a lista
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', error.message || 'Ocorreu um erro ao atualizar o livro.');
        }
    };

    const renderBookItem = ({ item }) => (
        <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text>Autor: {item.author}</Text>
            <Text>Editora: {item.publisher}</Text>
            <Text>Preço: R$ {item.price.toFixed(2)}</Text>
            <Button 
                title="Selecionar para Atualização" 
                onPress={() => selectBookForUpdate(item)} 
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atualização de Livros</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Digite parte do título do livro"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            
            <Button title="Buscar" onPress={searchBooks} />
            
            {books.length > 0 && !selectedBook ? (
                <FlatList
                    data={books}
                    renderItem={renderBookItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.list}
                />
            ) : (
                <Text style={styles.noResults}>
                    {searchTerm && books.length === 0 ? "Nenhum livro encontrado" : ""}
                </Text>
            )}

            {selectedBook && (
                <View style={styles.updateForm}>
                    <Text style={styles.updateTitle}>Atualizar Livro</Text>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Título"
                        value={form.title}
                        onChangeText={(text) => setForm({ ...form, title: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Autor"
                        value={form.author}
                        onChangeText={(text) => setForm({ ...form, author: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Editora"
                        value={form.publisher}
                        onChangeText={(text) => setForm({ ...form, publisher: text })}
                    />
                    
                    <View style={styles.buttonContainer}>
                        <Button title="Atualizar" onPress={updateBook} />
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Cancelar" 
                            onPress={() => setSelectedBook(null)} 
                            color="#ff6347"
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    list: {
        marginTop: 20,
    },
    bookItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    noResults: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
        color: '#666',
    },
    updateForm: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    updateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonContainer: {
        marginVertical: 5,
    }
});

export default BookUpdate;