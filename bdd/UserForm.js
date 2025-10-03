import React, { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const UserForm = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const db = useSQLiteContext();

    const handleSubmit = async () => {
        try {
            if (!form.firstName || !form.lastName || !form.email || !form.phone) {
                throw new Error('Por favor, preencha todos os campos.');
            }

            await db.runAsync(
                `INSERT INTO users (firstName, lastName, email, phone) VALUES (?, ?, ?, ?);`,
                [form.firstName, form.lastName, form.email, form.phone]
            );

            Alert.alert('Sucesso', 'Usuário adicionado com sucesso!');
            setForm({ firstName: '', lastName: '', email: '', phone: '' });
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', error.message || 'Ocorreu um erro ao adicionar o usuário.');
        }
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Primeiro Nome"
                value={form.firstName}
                onChangeText={(text) => setForm({ ...form, firstName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Sobrenome"
                value={form.lastName}
                onChangeText={(text) => setForm({ ...form, lastName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
            />
            <Button title="Adicionar" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
});