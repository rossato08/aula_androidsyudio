import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Principal({ navigation }) {

  function chamarCardapio() {
    navigation.navigate('tela de menu'); // Aqui você pode trocar pela tela do cardápio real
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.titulo}>🍔 McDonald's 🍟</Text>
        <Text style={styles.subtitulo}>Bem-vindo ao nosso cardápio digital</Text>

        <TouchableOpacity style={styles.botao} onPress={chamarCardapio}>
          <Text style={styles.textoBotao}>Entrar no Cardápio</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fundo branco
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo do container ajustado para branco com leve transparência
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFC107', // Amarelo característico do McDonald's
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    color: '#000', // Texto preto para contraste com fundo branco
    marginBottom: 30,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#D32F2F', // Vermelho característico do McDonald's
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});