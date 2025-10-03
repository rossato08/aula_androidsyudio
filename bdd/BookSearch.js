import React, { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { View, TextInput, Button, StyleSheet, Text, FlatList } from "react-native";

const BookSearch = () => {
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

    const renderBookItem = ({ item }) => (
        <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text><Text style={styles.label}>Autor:</Text> {item.author}</Text>
            <Text><Text style={styles.label}>Editora:</Text> {item.publisher}</Text>
            <Text><Text style={styles.label}>Preço:</Text> R$ {item.price.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscar Livros</Text>
            
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
        borderLeftColor: '#2196F3',
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

export default BookSearch;