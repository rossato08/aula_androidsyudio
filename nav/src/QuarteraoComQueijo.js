import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../styles';

export default function QuarteraoComQueijo({ navigation }) {
  return (
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.titulo}>Quarterão com Queijo</Text>
      
      <Image
        source={require('../assets/quarteirao-com-queijo.png')}
        style={sharedStyles.imagemDetalhe}
        resizeMode="contain"
      />
      
      <Text style={sharedStyles.descricao}>
        O Quarterão com Queijo é feito com carne 100% bovina, queijo cheddar, cebola, 
        picles, ketchup, mostarda, tudo no pão com gergelim. Um clássico irresistível!
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