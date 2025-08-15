import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  linha: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center'
  },
  caixaDeCodigo: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 10
  },
  textoCodigo: {
    fontFamily: 'Courier',
    fontSize: 14,
    color: '#333'
  },
  botaoLimpar: {
    marginTop: 10,
    backgroundColor: '#ff3b30',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  textoBotaoLimpar: {
    color: 'white',
    fontWeight: 'bold'
  }
});
