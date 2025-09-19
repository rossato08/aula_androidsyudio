import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';

export default function Cardapio({ navigation }) {

  function voltar() {
    navigation.navigate('Principal');
  }

  // Lista de hambúrgueres com nomes, imagens e rotas
  const hamburgers = [
    { nome: 'Big Mac', imagem: require('../assets/big-mac.png'), rota: 'Big-mac' },
    { nome: 'Cheddar McMelt', imagem: require('../assets/chedar.png'), rota: 'CheddarMcMelt' },
    { nome: 'McChicken', imagem: require('../assets/mcchicken.png'), rota: 'McChicken' },
    { nome: 'McChicken Duplo', imagem: require('../assets/mcchicken-duplo.png'), rota: 'McChicken-Duplo' },
    { nome: 'Quarterão com Queijo', imagem: require('../assets/quarteirao-com-queijo.png'), rota: 'Quarteirao-com-Queijo' },
    { nome: 'Tasty Turbo 3 carnes', imagem: require('../assets/Tasty-Turbo.png'), rota: 'Tasty-Turbo' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🍔 Cardápio McDonald's 🍟</Text>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {hamburgers.map((hamburger, index) => (
          <TouchableOpacity
            key={index}
            style={styles.botao}
            onPress={() => navigation.navigate(hamburger.rota)}
          >
            <Image
              source={hamburger.imagem}
              style={styles.imagem}
              resizeMode="contain"
            />
            <Text style={styles.textoBotao}>{hamburger.nome}</Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
          <Text style={styles.textoBotaoVoltar}>Voltar para Tela Principal</Text>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFC107', // Amarelo característico do McDonald's
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  botao: {
    flexDirection: 'row', // Alinha a imagem e o texto horizontalmente
    backgroundColor: '#D32F2F', // Vermelho característico do McDonald's
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  imagem: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Faz o texto ocupar o espaço restante
  },
  botaoVoltar: {
    backgroundColor: '#757575', // Cinza para o botão de voltar
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});