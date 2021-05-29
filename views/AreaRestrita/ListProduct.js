import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import css from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../config/config';


import {Text, TextInput, TouchableOpacity,View,Image,FlatList,StyleSheet,ActivityIndicator} from 'react-native';


export default function ListProduct({navigation}){

const [idUser,setIdUser]=useState(null);
const [data,setData] = useState([]);


async function sendForm(){
 
  let response = await fetch(`${config.urlRoot}verifyPass`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        id: idUser,
        senhaAntiga: senhaAntiga,
        novaSenha:novaSenha,
        ConfnovaSenha:ConfnovaSenha

  })
});
  let json=await response.json();
   
  setMsg(json);
}
async function listarProdutos(){
  let response = await fetch(`${config.urlRoot}listProduct`, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
 
});
}


    return(

     
  

      <View >
        <TouchableOpacity onPress={()=>listarProdutos()}>
          <Text>Atualizar</Text>
        </TouchableOpacity>
           <Text>Lista de Produtos</Text>
    
  
      </View> 
      
            
    ); 
}