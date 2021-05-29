import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import css from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            </View>
           </View>
                    <View style={[css.profile__formRec]}>
                        <Text style={[css.profile__Text]}>Trocar Senha de Acesso</Text>
                        <Text>{msg}</Text>
                        <TextInput style={[css.profile__inputText]} placeholder='Senha Antiga:'secureTextEntry={true} onChangeText={text=>setSenhaAntiga(text)} />
                        <TextInput style={[css.profile__inputText]} placeholder='Nova Senha:' secureTextEntry={true} onChangeText={text=>setNovaSenha(text)} />
                        <TextInput style={[css.profile__inputText]}placeholder='Confirmar Senha:' secureTextEntry={true} onChangeText={text=>setConfNovaSenha(text)} />
                    
                    <TouchableOpacity style={[css.profile__button]} onPress={()=>sendForm()}>
                        <Text style={[css.profile__buttonText]}>Trocar</Text>
                    </TouchableOpacity>
                    </View>
         </View>
 </View> 
            
    ); 
}