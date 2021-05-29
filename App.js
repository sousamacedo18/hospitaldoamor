
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import {Home,Login,Rastreio} from './views/Index';
import AreaRestrita from './views/AreaRestrita/AreaRestrita';
import RecoverPassword from './views/AreaRestrita/RecoverPassword';
import ListProduct from './views/AreaRestrita/ListProduct';


export default function App() {

  const Stack = createStackNavigator();
  return (
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Home" 
        component={Home}
        options ={{
          title:"Bem-vindo",
          headerStyle:{backgroundColor:'#dcdcdc'},
          headerTintColor:'#333',
          headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}

        }}
   
        />
        <Stack.Screen name="Login" options={{headerShown:false}} component={Login} />
        <Stack.Screen name="Rastreio" component={Rastreio} />
        <Stack.Screen 
                    name="RecoverPassword"
                    component={RecoverPassword} 
                    options ={{
                      title:"Recuperar Senha",
                      headerStyle:{backgroundColor:'#F58634'},
                      headerTintColor:'#fff',
                      headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            
                    }}
        />
        <Stack.Screen 
                    name="ListProduct"
                    component={ListProduct} 
                    options ={{
                      title:"Lista de Produtos",
                      headerStyle:{backgroundColor:'#F58634'},
                      headerTintColor:'#fff',
                      headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            
                    }}
        />
        <Stack.Screen name="AreaRestrita" options={{headerShown:false}} component={AreaRestrita} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
