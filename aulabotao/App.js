import { View, TouchableOpacity, Alert } from 'react-native';
import { styles } from './style';

export default function App() {
 
  const colors = {
    color1: '#45ab44',
    color2: '#db4588',
    color3: '#2a7fff',
    color4: '#ff9500',
    color5: '#a158ff',
    color6: '#00c2a8',
    color7: '#ff3b30',
    color8: '#8e8e93'
  };

 
  function showColorCode(colorKey) {
    const colorCode = colors[colorKey].substring(1); // Remove o #
    console.log(`Cor ${colorKey}: ${colorCode}`);
    Alert.alert(`Código da Cor`, colorCode);
  }

  return (
    <View style={styles.container}>
   
      <View style={styles.linha}>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: colors.color1}]} 
          onPress={() => showColorCode('color1')}>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: colors.color2}]} 
          onPress={() => showColorCode('color2')}>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: colors.color3}]} 
          onPress={() => showColorCode('color3')}>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: colors.color4}]} 
          onPress={() => showColorCode('color4')}>
        </TouchableOpacity>
      </View>
      
      {/* Segunda linha com 4 botões */}
      <View style={styles.linha}>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: colors.color5}]} 
          onPress={() => showColorCode('color5')}>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: colors.color6}]} 
          onPress={() => showColorCode('color6')}>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: colors.color7}]} 
          onPress={() => showColorCode('color7')}>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: colors.color8}]} 
          onPress={() => showColorCode('color8')}>
        </TouchableOpacity>
      </View>
    </View>
  );
}