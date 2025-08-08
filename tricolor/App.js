import {  Text, View } from 'react-native';
import{ styles } from './styles'
 
export default function App() {
  return (
    <View  style={styles.container}> 

    <View style={styles.area1}>
      <Text style={styles.title}>Área 1 </Text>
    </View>
    <View style={styles.area2}>
    <Text style={styles.title}>Área 2 </Text>
    </View>
    <View style={styles.area3}>
    <Text style={styles.title}>Área 3 </Text>
    </View>
    
    </View>
  );
}

