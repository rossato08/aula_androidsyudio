import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import Principal from './src/Principal';
import Tela2 from './src/Tela2';
import Tela3 from './src/Tela3';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>

       <Stack.Screen name='Principal' component={Principal}/>
       <Stack.Screen name='Tela2' component={Tela2}/>
       <Stack.Screen name='Tela3' component={Tela3}/>
    
    </Stack.Navigator>
    </NavigationContainer>
  );
}


