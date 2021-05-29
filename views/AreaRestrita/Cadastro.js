import React, { useState,useEffect } from 'react';
import { View, TextInput,Text, TouchableOpacity,Image, Button,FlatList} from 'react-native';
import css from '../../assets/css/Css';
import config from '../../config/config';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Cadastro({navigation}){
   const address=config.origin;
   const[code,setCode]=useState(null);
   const[user,setUser]=useState(null);
   const[product,setProduct]=useState(null);
   const[response,setResponse]=useState(null);


   useEffect(()=>{
        getUser();
      
   },[]);
// Gerar código Randomico
useEffect(()=>{
    randomCode();
    setProduct(null);
},[response]);

async function randomCode(){
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = 20;
    for ( let i = charactersLength; i>0; --i ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));

    }

    setCode(result);
}

async function getUser(){
    let response=await AsyncStorage.getItem('userData');
    let json=JSON.parse(response);
    setUser(json.id);
}

//enviar formulario 




async function sendForm(){
    let response = await fetch(`${config.urlRoot}create`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                    userId:user,
                    code:code,
                    product:product,
                    local:address
            })
    });
    let json=await response.json();
   
    setResponse(json);
}
//Compartilha o QrCode

async function shareQR()
{
    const image=config.urlRoot+'img/code.png';
   
    FileSystem.downloadAsync(
        image,
        FileSystem.documentDirectory+'code.png'
    ).then(({uri})=>{
        Sharing.shareAsync(uri);
    });
    await Sharing.shareAsync();
}
    return(

        <View style={[css.container,css.containerTop]}>
                <MenuAreaRestrita title='Cadastro' navigation={navigation}/>
                {response &&(
                    <View>
                            <Image source={{uri:response, height:180, width:180}}
                            />
                            <Button title='Compartilhar' onPress={()=>shareQR()}/>
                   </View>
                )

                }
                <View style={[css.profile__formRec]} >
             
                <TextInput style={[css.cadastro__inputText]}
                    placeholder='Nome do Produto'
                    onChangeText={text => setProduct(text)}
                    value={product}

                     />
                </View>
                <View>
                    <TouchableOpacity 
                    style={[css.cadastro__button]}
                    onPress={()=>{sendForm()}}
                    >
                        <Text>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[css.cadastro__button]}
                    onPress={()=>{navigation.navigate('ListProduct')}}
                    >
                        <Text>Listar</Text>
                    </TouchableOpacity>

                </View>
                
     
        </View> 
            
    ); 
}