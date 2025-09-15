import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFC107', // Amarelo característico do McDonald's
    marginBottom: 20,
    textAlign: 'center',
  },
  botao: {
    flexDirection: 'row', // Alinha a imagem e o texto horizontalmente
    backgroundColor: '#D32F2F', // Vermelho característico do McDonald's
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
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
  imagemDetalhe: {
    width: 200,
    height: 200,
    marginBottom: 20,
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
  descricao: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
});