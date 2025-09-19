import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../styles';

export default function TastyTurbo({ navigation }) {
  return (
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.titulo}>Tasty Turbo 3 Carnes</Text>
      
      <Image
        source={require('../assets/Tasty-Turbo.png')}
        style={sharedStyles.imagemDetalhe}
        resizeMode="contain"
      />
      
      <Text style={sharedStyles.descricao}>
        O Tasty Turbo 3 Carnes é o hambúrguer mais robusto do cardápio! 
        Três hambúrgueres de carne 100% bovina, queijo cheddar, alface, tomate, 
        cebola e molho tasty no pão com gergelim.
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