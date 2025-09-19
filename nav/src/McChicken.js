import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../styles';

export default function McChicken({ navigation }) {
  return (
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.titulo}>McChicken</Text>
      
      <Image
        source={require('../assets/mcchicken.png')}
        style={sharedStyles.imagemDetalhe}
        resizeMode="contain"
      />
      
      <Text style={sharedStyles.descricao}>
        O McChicken é feito com filé de frango empanado e crocante, alface americana fresca, 
        maionese cremosa, tudo no delicioso pão com gergelim.
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