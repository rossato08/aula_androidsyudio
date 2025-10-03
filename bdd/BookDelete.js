import React, { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { View, TextInput, Button, StyleSheet, Text, Alert, FlatList } from "react-native";

const BookDelete = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const db = useSQLiteContext();

    const searchBooks = async () => {
        try {
            const results = await db.getAllAsync(
                `SELECT * FROM books WHERE title LIKE ?;`,
                [`%${searchTerm}%`]
            );
            setBooks(results);
        } catch (error) {
            console.error(error);
            setBooks([]);
        }
    };

    const confirmDelete = (book) => {
        Alert.alert(
            "Confirmar Exclusão",
            `Deseja realmente excluir o livro "${book.title}"?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: () => deleteBook(book.id),
                    style: "destructive"
                }
            ]
        );
    };

    const deleteBook = async (bookId) => {
        try {
            await db.runAsync(
                `DELETE FROM books WHERE id = ?;`,
                [bookId]
            );
            
            Alert.alert('Sucesso', 'Livro removido com sucesso!');
            // Atualiza a lista após a exclusão
            searchBooks();
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao remover o livro.');
        }
    };

    const renderBookItem = ({ item }) => (
        <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text><Text style={styles.label}>Autor:</Text> {item.author}</Text>
            <Text><Text style={styles.label}>Editora:</Text> {item.publisher}</Text>
            <Text><Text style={styles.label}>Preço:</Text> R$ {item.price.toFixed(2)}</Text>
            <Button 
                title="Excluir" 
                onPress={() => confirmDelete(item)}
                color="#F44336"
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Remover Livro</Text>
            
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite parte do título do livro"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <Button title="Buscar" onPress={searchBooks} color="#2196F3" />
            </View>
            
            {books.length > 0 ? (
                <FlatList
                    data={books}
                    renderItem={renderBookItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.list}
                />
            ) : (
                <Text style={styles.noResults}>
                    {searchTerm ? "Nenhum livro encontrado" : "Digite parte do título para buscar"}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    list: {
        flex: 1,
    },
    bookItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#F44336',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    noResults: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
        color: '#666',
    }
});

export default BookDelete;