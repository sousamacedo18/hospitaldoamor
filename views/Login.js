import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {KeyboardAvoidingView,Image, StyleSheet, Text, View, Button, TextInput,TouchableOpacity, Platform } from 'react-native';
import css from "../assets/css/logincss";
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect } from 'react/cjs/react.development';
import config from '../config/config.json';
export default function Login({navigation}){
    
    const [display, setDisplay]=useState(null);
    const [user, setUser]=useState(null);
    const [password, setPassword]=useState(null);
    const [login, setLogin]=useState(false);
//Envio do formulario de login
useEffect(()=>{
    verifyLogin();
},[]);

useEffect(()=>{
    if (login===true){
        biometric();
    }
},[login]);
async function verifyLogin(){
    let response=await AsyncStorage.getItem('userData');
    let json=await JSON.parse(response);

    if(json !==null){
        setUser(json.name);
        setPassword(json.password);
        setLogin(true);
    }
//biometria
}
async function biometric(){
  let compatible = await LocalAuthentication.hasHardwareAsync();
  if (compatible){
      let biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if(!biometricRecords){
          alert('Biometria não Cadastrada');
      }else{
          let result=await LocalAuthentication.authenticateAsync();
          if (result.success){
              sendForm();
          }else{
              setUser(null);
              setPassword(null);
          }
      }
  } 
}


async function sendForm(){

    
    let response = await fetch(`${config.urlRoot}login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            name: user,
            password: password
  
      })

});
let json=await response.json();
if (json=="Error"){
    setDisplay("Erro o login ou a senha!" );
    setTimeout(() => {
        setDisplay(null);
      }, 5000);
      await AsyncStorage.clear;
}else{
    let userData=await AsyncStorage.setItem('userData',JSON.stringify(json));
    let resData=await AsyncStorage.getItem('userData');
    console.log(JSON.parse(resData));
    navigation.navigate('AreaRestrita');
}
}


    return(

        <KeyboardAvoidingView style={[css.container, css.darkbg]}
         behavior={Platform.OS=="ios" ? "padding":"height"}>
            <View>
    
              {/* <Image resizeMode='contain' style={{ height: 150,marginTop:10,alignSelf:'center' }}
                source={require('../assets/img/cadeirante.png')}
               /> */}
               <Text style={[css.login__textLogo1]}>ReabApp</Text>
               
            </View>
            <View>
                
            </View>
            <View style={[css.login__form]}>
            {/* <Text>{user} - {password}</Text> */}
            <Text style={[css.login__msg]}>{display}</Text>
                <TextInput style={[css.login__input]} placeholder="Usuário:" onChangeText={text=>setUser(text)}/>
                <TextInput style={[css.login__input]} placeholder="Senha:" onChangeText={text=>setPassword(text)} secureTextEntry={true} />
                <TouchableOpacity
                     style={[css.login__button]}
                     onPress={()=>sendForm()}
                     >
                        <Text style={[css.login__buttonText]}>Entrar</Text>
                 </TouchableOpacity>
                <TouchableOpacity
                     style={[css.login__buttonCadastro]}
                     onPress={()=>sendForm()}
                     >
                        <Text style={[css.login__buttonTextCadastro]}>Cadastrar</Text>
                 </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    ); 
}