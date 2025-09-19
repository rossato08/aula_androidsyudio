import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../styles';

export default function McChickenDuplo({ navigation }) {
  return (
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.titulo}>McChicken Duplo</Text>
      
      <Image
        source={require('../assets/mcchicken-duplo.png')}
        style={sharedStyles.imagemDetalhe}
        resizeMode="contain"
      />
      
      <Text style={sharedStyles.descricao}>
        O McChicken Duplo traz dois filés de frango empanados e crocantes, alface americana fresca, 
        maionese cremosa, servidos no pão com gergelim. Dobro do sabor que você já conhece!
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