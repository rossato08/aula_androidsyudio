import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {

  const [nome, setNome] = useState('')

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Informe seu nome'
        value={nome}
        onChangeText={text => setNome(text)}  
       
      />
      
      <Text>Boas vindas {nome}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
