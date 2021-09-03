import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState,useEffect } from 'react';
import {KeyboardAvoidingView,Image, Text, View, TextInput,TouchableOpacity, Platform,StyleSheet } from 'react-native';
import css from "../assets/css/logincss";
import * as LocalAuthentication from 'expo-local-authentication';

import api from '../services/api';



export default function Login({navigation}){
    
    const [display, setDisplay]=useState(null);
    const [user, setUser]=useState("");
    const [iduser, setIduser]=useState();
    const [idund, setIdund]=useState();
    const [matricula, setMatricula]=useState('123456789');
    const [senha, setSenha]=useState('');
    const [login, setLogin]=useState(false);
    const [loading,setLoading] = useState('');
    const data={
        matricula,
        senha,
    }




    async function logarUsuario(){
        try{
            const resultado = await api.post('/logar',data);
            const mat=resultado.data.matricula;
            const id=resultado.data.id;
            const idu=resultado.data.idunid;
            const mati=resultado.data.matricula;
            const nom=resultado.data.nome;
             let sessao = {
                idusu:id,
                mat:mati,
                idund:idu,
                nome:nom
             }

                let userData=await AsyncStorage.setItem('userData',JSON.stringify(sessao));
                let resData=await AsyncStorage.getItem('userData');
                //console.log(JSON.parse(resData));
                // navigation.navigate('AreaRestrita');
                
                navigation.navigate('Controle');

        

         }catch(err){
                 alert('Matrícula ou senha incorretos!')
                 await AsyncStorage.clear;
                 //console.log("encontramos o seguinte erro: "+err);
         }
     }
//Envio do formulario de login


 useEffect(()=>{
    if (login===true){
        biometric();
     }
},[login]);

async function verifyLogin(){
    let response=await AsyncStorage.getItem('userData');
    let json=await JSON.parse(response);

    if(json !==null){
        setUser(json.nome);
        setMatricula(json.mat);
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
              logarUsuario();
          }else{
              setMatricula(null);
              setSenha(null);
          }
      }
  } 
}



    return(

        <KeyboardAvoidingView style={[estilo.container]}
         behavior={Platform.OS=="ios" ? "padding":"height"}>
            <View style={[estilo.containerTop]} >
            <Image source={require('../assets/img/logo5.png')}
            style={{ width: 300, height: 120,resizeMode:"contain" }}
            />
               {/* <Text style={[css.login__textLogo1]}>Registro de Processos</Text> */}
               
            </View>
 
            <View style={[estilo.login__form]}>
            {/* <Text>{user} - {password}</Text> */}
            <Text style={[css.login__msg]}>{display}</Text>
                <TextInput style={[estilo.login__input]} 
                placeholder="Matrícula:" 
                value={matricula}
                onChangeText={text=>setMatricula(text)}/>
                <TextInput style={[estilo.login__input]} 
                placeholder="Senha:" 
                onChangeText={text=>setSenha(text)} secureTextEntry={true} />
                <TouchableOpacity
                     style={[estilo.login__button]}
                    // onPress={()=>sendForm()}
                     onPress={()=>logarUsuario()}
                     >
                        <Text style={[estilo.login__buttonText]}>Entrar</Text>
                 </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    ); 

}

const estilo = StyleSheet.create({
    container:{
            flexDirection:"column",
            justifyContent:"space-between",
            height:"100%",
            backgroundColor:"white",
       
    },
    containerTop:{
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        flex:1,
    },
    login__form:{
        width: "100%",
        padding:20,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        //cor roso da imagem do logo
        //backgroundColor:"#e6008a",
        backgroundColor:"#47aee6",
        flex:1
        
    },
    login__input:{
        backgroundColor:"#fff",
        fontSize:19,
        padding:7,
        marginBottom:15,
        borderRadius:5
    },
    login__button:{
        padding:12,
        backgroundColor:"#e6008a",
        //backgroundColor:"#1e90ff",
        alignSelf:"center",
        borderRadius:5,
        width:"100%"
        
    },
    login__buttonText:{
        fontWeight:"bold",
        fontSize:22,
        color:"#fff5ee",
        alignSelf:"center"
    },
})