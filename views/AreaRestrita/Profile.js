import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import css from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';
import {Text, TextInput, TouchableOpacity,View,Image} from 'react-native';


export default function Profile({navigation}){

const [idUser,setIdUser]=useState(null);
const [senhaAntiga,setSenhaAntiga]=useState(null);
const [novaSenha,setNovaSenha]=useState(null);
const [ConfnovaSenha,setConfNovaSenha]=useState(null);
const [msg,setMsg]=useState(null);


useEffect(()=>{
  async function getIUser(){
    let response= await AsyncStorage.getItem('userData');
    let json = json.parse(response);
    setIdUser(json.id);
  }
});

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



    return(

      <View style={[css.containerTop]}>
         <MenuAreaRestrita title='Perfil' navigation={navigation}/>
         <View style={[css.containerProfile]}>
           <View style={[css.profile__avatar]}>
                <View>
                        <Image
                                  style={[css.tinyLogo]}
                                  source={require('../../assets/img/eu.jpg')}
                                />
                          
                        </View>
                <View>
                          <Text>Carlos Henrique Sousa de Macedo</Text>
                          <Icon name="edit" size={20} color="#999" />
                </View>
           </View>
           <TouchableOpacity style={[css.profile__button]} onPress={()=>{navigation.navigate('RecoverPassword')}}>
                  <Text style={[css.profile__buttonText]}>Recuperar Senha</Text>
           </TouchableOpacity>
         </View>
 </View> 
            
    ); 
}