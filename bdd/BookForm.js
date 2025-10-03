import React, { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";

const BookForm = ({ navigation }) => {
    const [form, setForm] = useState({
        title: '',
        author: '',
        publisher: '',
        price: ''
    });

    const db = useSQLiteContext();

    const handleSubmit = async () => {
        try {
            // Validação dos campos
            if (!form.title || !form.author || !form.publisher || !form.price) {
                throw new Error('Por favor, preencha todos os campos.');
            }

            // Validação do preço (deve ser um número)
            const price = parseFloat(form.price);
            if (isNaN(price) || price <= 0) {
                throw new Error('O preço deve ser um número válido maior que zero.');
            }

            await db.runAsync(
                `INSERT INTO books (title, author, publisher, price) VALUES (?, ?, ?, ?);`,
                [form.title, form.author, form.publisher, price]
            );

            Alert.alert('Sucesso', 'Livro cadastrado com sucesso!');
            setForm({ title: '', author: '', publisher: '', price: '' });
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', error.message || 'Ocorreu um erro ao cadastrar o livro.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Livros</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Título do Livro"
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
            <TextInput
                style={styles.input}
                placeholder="Preço"
                value={form.price}
                keyboardType="numeric"
                onChangeText={(text) => setForm({ ...form, price: text })}
            />
            
            <View style={styles.buttonContainer}>
                <Button title="Cadastrar" onPress={handleSubmit} color="#4CAF50" />
            </View>
            
            <View style={styles.buttonContainer}>
                <Button 
                    title="Consultar" 
                    onPress={() => navigation.navigate('Buscar Livro')}
                    color="#2196F3"
                />
            </View>
            
            <View style={styles.buttonContainer}>
                <Button 
                    title="Atualizar" 
                    onPress={() => navigation.navigate('Atualizar Livro')}
                    color="#FF9800"
                />
            </View>
            
            <View style={styles.buttonContainer}>
                <Button 
                    title="Remover" 
                    onPress={() => navigation.navigate('Remover Livro')}
                    color="#F44336"
                />
            </View>
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        marginVertical: 8,
    }
});

export default BookForm;