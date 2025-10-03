import React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookForm from './BookForm';
import BookSearch from './BookSearch';
import BookUpdate from './BookUpdate';
import BookDelete from './BookDelete';

const Stack = createNativeStackNavigator();

export default function App() {
  // Verificar se está rodando na web
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          O SQLite não é suportado na versão web.
          Por favor, execute este aplicativo em um dispositivo móvel ou emulador.
        </Text>
      </View>
    );
  }

  // Versão para dispositivos móveis
  return (
    <SQLiteProvider
      databaseName="bookDatabase.db"
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            publisher TEXT NOT NULL,
            price REAL NOT NULL
          );
          PRAGMA journal_mode=WAL;
        `);
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BookForm">
          <Stack.Screen name="Cadastro de Livros" component={BookForm} />
          <Stack.Screen name="Buscar Livro" component={BookSearch} />
          <Stack.Screen name="Atualizar Livro" component={BookUpdate} />
          <Stack.Screen name="Remover Livro" component={BookDelete} />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  }
});