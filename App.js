
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import {Home,Login,Rastreio} from './views/Index';
import AreaRestrita from './views/AreaRestrita/AreaRestrita';
import RecoverPassword from './views/AreaRestrita/RecoverPassword';
import ListProduct from './views/AreaRestrita/ListProduct';
import DetalhesProduto from './views/AreaRestrita/DetailProduto';
import DetalhesUsuario from './views/AreaRestrita/DetailUsuario';
import Controle from './views/AreaRestrita/Controle';
import Pesquisar from './views/AreaRestrita/Pesquisar';
import Cadastro from './views/AreaRestrita/Cadastro';
import CadastroUsuario from './views/AreaRestrita/CadastroUsuario';
import EditarUsuario from './views/AreaRestrita/EditarUsuario';
import Fluxo from './views/AreaRestrita/Fluxo';
import ListUsuarios from './views/AreaRestrita/ListUsuarios';
import Pesquisarusuario from './views/AreaRestrita/Pesquisarusuario';


export default function App() {

  const Stack = createStackNavigator();
  return (
<NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen 
        name="Home" 
        component={Home}
        options ={{
          title:"Bem-vindo",
          headerStyle:{backgroundColor:'#dcdcdc'},
          headerTintColor:'#333',
          headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}

        }}
   
        /> */}
        <Stack.Screen name="Login" options={{headerShown:false}} component={Login} />
        <Stack.Screen name="Rastreio" component={Rastreio} />
        <Stack.Screen 
                    name="RecoverPassword"
                    component={RecoverPassword} 
                    options ={{
                      title:"Recuperar Senha",
                      headerStyle:{backgroundColor:'#add8e6'},
                      headerTintColor:'#191970',
                      headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            
                    }}
        />
        <Stack.Screen 
                    name="ListProduct"
                    component={ListProduct} 
                    options={{headerShown:false}}
                    // options ={{
                    //   title:"Lista de Produtos",
                    //   headerStyle:{backgroundColor:'#add8e6'},
                    //   headerTintColor:'#191970',
                    //   headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            
                    // }}
        />
        <Stack.Screen 
                    name="ListUsuarios"
                    component={ListUsuarios} 
                    options={{headerShown:false}}
                    // options ={{
                    //   title:"Lista de Usuários",
                    //   headerStyle:{backgroundColor:'#add8e6'},
                    //   headerTintColor:'#191970',
                    //   headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            
                    // }}
        />
        <Stack.Screen 
                    name="Pesquisarusuario"
                    component={Pesquisarusuario} 
                    options={{headerShown:false}}
                    // options ={{
                    //   title:"Lista de Usuários",
                    //   headerStyle:{backgroundColor:'#add8e6'},
                    //   headerTintColor:'#191970',
                    //   headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            
                    // }}
        />
        <Stack.Screen 
                    name="DetalhesProduto"
                    component={DetalhesProduto} 
                    options={{headerShown:false}}
                    // options ={{
                    //   title:"Registrar Processo",
                    //   headerStyle:{backgroundColor:'#add8e6'},
                    //   headerTintColor:'#191970',
                    //   headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            
                    // }}
        />
        <Stack.Screen 
                    name="DetalhesUsuario"
                    component={DetalhesUsuario} 
                    options={{headerShown:false}}
                    // options ={{
                    //   title:"Detalhes Usuário",
                    //   headerStyle:{backgroundColor:'#add8e6'},
                    //   headerTintColor:'#00008b',
                    //   headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
           
                    
        />
        <Stack.Screen 
                    name="Fluxo"
                    component={Fluxo}
                    options={{headerShown:false}} 
                    // options ={{
                    //   title:"Etapa",
                    //   headerStyle:{backgroundColor:'#add8e6'},
                    //   headerTintColor:'#191970',
                    //   headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            
                    // }}
        />
        <Stack.Screen name="AreaRestrita" options={{headerShown:false}} component={AreaRestrita} />
        <Stack.Screen name="Controle" options={{headerShown:false}} component={Controle} />
        <Stack.Screen name="Cadastro" 
        component={Cadastro}
        options={{headerShown:false}}
        // options={
        //   {
        //     title:"Cadastro de Produto",
        //     headerStyle:{backgroundColor:'#add8e6'},
        //     headerTintColor:'#191970',
        //     headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}     
        //   } } 
           />

        <Stack.Screen name="EditarUsuario"
        component={EditarUsuario} 
        options={{headerShown:false}} 
        // options={
        //   {
        //     title:"Alterar Cadastro",
        //     headerStyle:{backgroundColor:'#add8e6'},
        //     headerTintColor:'#191970',
        //     headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}     
        //   }
        //   }  
          />

        <Stack.Screen 
        name="CadastroUsuario"
        component={CadastroUsuario} 
         options={{headerShown:false}} 
        // options={
        //   {
        //     title:"Cadastro de Usuário",
        //     headerStyle:{backgroundColor:'#add8e6'},
        //     headerTintColor:'#191970',
        //     headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}     
        //   }
          
         
          />
        <Stack.Screen 
            name="Pesquisar"
            options={{headerShown:false}} 
            component={Pesquisar} 
            // options={
            //   {
            //     title:"Pesquisar  Produto",
            //     headerStyle:{backgroundColor:'#add8e6'},
            //     headerTintColor:'#191970',
            //     headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}  
            //   }
            
            // } 
             />
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
