import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import Principal from './src/Principal';
import Tela2 from './src/cardapio';
import Tela3 from './src/big-mac';
import cardapio from './src/cardapio';
import bigmac from './src/big-mac';
import CheddarMcMelt from './src/CheddarMcMelt';
import McChicken from './src/McChicken';
import McChickenDuplo from './src/McChickenDuplo';
import QuarteraoComQueijo from './src/QuarteraoComQueijo';
import TastyTurbo from './src/TastyTurbo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Principal' component={Principal}/>
        <Stack.Screen name='tela de menu' component={cardapio}/>
        <Stack.Screen name='Big-mac' component={bigmac}/>
        <Stack.Screen name='CheddarMcMelt' component={CheddarMcMelt}/>
        <Stack.Screen name='McChicken' component={McChicken}/>
        <Stack.Screen name='McChicken-Duplo' component={McChickenDuplo}/>
        <Stack.Screen name='Quarteirao-com-Queijo' component={QuarteraoComQueijo}/>
        <Stack.Screen name='Tasty-Turbo' component={TastyTurbo}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}