import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../styles';

export default function Tela3({ navigation }) {
  return (
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.titulo}>Big Mac</Text>
      
      <Image
        source={require('../assets/big-mac.png')}
        style={sharedStyles.imagemDetalhe}
        resizeMode="contain"
      />
      
      <Text style={sharedStyles.descricao}>
        O Big Mac é composto por dois hambúrgueres de carne 100% bovina, alface crocante, queijo cheddar derretido, 
        picles, cebola, molho especial e pão com gergelim.
      </Text>
      
      <TouchableOpacity
        style={sharedStyles.botaoVoltar}
        onPress={() => navigation.navigate('tela de menu')}
      >
        <Text style={sharedStyles.textoBotaoVoltar}>Voltar para o Cardápio</Text>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
}