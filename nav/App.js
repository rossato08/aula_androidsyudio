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


const Stack = createStackNavigator();

export default function App() {
  return (


    <NavigationContainer>
    <Stack.Navigator>



       <Stack.Screen name='Principal' component={Principal}/>
       <Stack.Screen name='tela de menu' component={cardapio}/>
       <Stack.Screen name='Big-mac' component={bigmac}/>
       <Stack.Screen name='CheddarMcMelt' component={CheddarMcMelt}/>
     
        
    </Stack.Navigator>
    </NavigationContainer>

    
  );
}


