import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

export default function Tela2({navigation}) {

function voltar(){
    navigation.navigate('Principal')
}

  return (
    <View style={styles.container}>
      <Text>tela 2</Text>
      
      <TouchableOpacity onPress={voltar}>
       <Text>Tela Principal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
