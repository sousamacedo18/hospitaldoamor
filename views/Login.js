import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {KeyboardAvoidingView,Image, Text, View, TextInput,TouchableOpacity, Platform } from 'react-native';
import css from "../assets/css/logincss";
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect } from 'react/cjs/react.development';
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

    const armazenar = (chave,valor)=>{
        AsyncStorage.setItem(chave, JSON.stringify(valor));
        let json= AsyncStorage.getItem(JSON.parse(valor));
       
    }
    const buscar = async (chave) => {
        try {
          const jsonValue = await AsyncStorage.getItem(chave)
          return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
          // read error
        }
      
        console.log('Done.')
      
      }

    async function logarUsuario(){
      
        try{

            const resultado = await api.post('/logar',data);
           
            //  const mat=resultado.data.resultado[0].matricula;
            //  const id=resultado.data.resultado[0].id;
            //  const idu=resultado.data.resultado[0].idunid;
            //  const mati=resultado.data.resultado[0].matricula;
            //  const nom=resultado.data.resultado[0].nome;

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
                console.log(JSON.parse(resData));
 
                // navigation.navigate('AreaRestrita');
                 navigation.navigate('Controle');
             

         }catch(err){
                 alert('Matrícula ou senha incorretos!')
                 await AsyncStorage.clear;
                 console.log("encontramos o seguinte erro: "+err);
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


// async function sendForm(){

    
//     let response = await fetch(`${config.urlRoot}login`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//           },
//         body: JSON.stringify({
//             name: user,
//             password: password
  
//       })

// });
// let json=await response.json();
// if (json=="Error"){
//     setDisplay("Erro o login ou a senha!" );
//     setTimeout(() => {
//         setDisplay(null);
//       }, 5000);
//       await AsyncStorage.clear;
// }else{
//     let userData=await AsyncStorage.setItem('userData',JSON.stringify(json));
//     let resData=await AsyncStorage.getItem('userData');
//     console.log(JSON.parse(resData));
//     navigation.navigate('AreaRestrita');
// }
// }


    return(

        <KeyboardAvoidingView style={[css.container, css.darkbg]}
         behavior={Platform.OS=="ios" ? "padding":"height"}>
            <View >
            <Image source={require('../assets/img/logo6.png')}
            style={{ width: 300, height: 120 }}
            />
               {/* <Text style={[css.login__textLogo1]}>Registro de Processos</Text> */}
               
            </View>
            <View>
            
            </View>
            <View style={[css.login__form]}>
            {/* <Text>{user} - {password}</Text> */}
            <Text style={[css.login__msg]}>{display}</Text>
                <TextInput style={[css.login__input]} 
                placeholder="Matrícula:" 
                value={matricula}
                onChangeText={text=>setMatricula(text)}/>
                <TextInput style={[css.login__input]} 
                placeholder="Senha:" 
                onChangeText={text=>setSenha(text)} secureTextEntry={true} />
                <TouchableOpacity
                     style={[css.login__button]}
                    // onPress={()=>sendForm()}
                     onPress={()=>logarUsuario()}
                     >
                        <Text style={[css.login__buttonText]}>Entrar</Text>
                 </TouchableOpacity>
                {/* <TouchableOpacity
                     style={[css.login__buttonCadastro]}
                     onPress={()=>logarUsuario()}
                     >
                        <Text style={[css.login__buttonTextCadastro]}>Cadastrar</Text>
                 </TouchableOpacity> */}
            </View>

        </KeyboardAvoidingView>
    ); 
}