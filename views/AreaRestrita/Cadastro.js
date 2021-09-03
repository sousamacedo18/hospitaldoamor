import React, { useState,useEffect } from 'react';
import { 
    View, 
    TextInput,
    Text,
    TouchableOpacity,
    Image,StyleSheet, 
    Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  
import css from '../../assets/css/Cadastro';
import Modal from '../../assets/Components/Modal';
import config from '../../config/config';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';


export default function Cadastro({navigation}){
   const address=config.origin;
   const[code,setCode]=useState(null);
   const[user,setUser]=useState();
   const[und,setUnd]=useState();
   const[product,setProduct]=useState(null);
   const[idcli,setIdcli]=useState(null);
   const[response,setResponse]=useState(null);
   const[idtipo,setIdTipo]=useState();
   const [tipo,setTipo]=useState("Tipo de Produto");
   const data = {
       codigo:code,
       idcli:idcli,
       idund:und,
       descricao:product,
       idtipo:idtipo,
       idusu:user
   }
  
  useEffect(()=>{
       getSessao()
      
  },[]);
  
   useEffect(()=>{
        setIdcli(idcli)
      
   },[idcli]);


// Gerar código Randomico
useEffect(()=>{
    randomCode();
    setProduct(null);
    setIdcli(null);
    setTipo("Tipo de Produto");

    
},[response]);
async function getSessao(){
    let response=await AsyncStorage.getItem('userData');
    let json=await JSON.parse(response);
    setUser(json.idusu);
    setUnd(json.idund);
    
}
const buscar = async (chave)=>{
    const valor = await AsyncStorage.getItem(chave); 
    //let json=await JSON.parse(valor);
    
    return valor;
}
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


async function salvarForm(){
    getSessao();
    console.log(data);
   
    await api.post('/cadastrar',data)
        .then(response => { 
            setResponse(response.data);
            console.log(response.data);
           //return response; 
        })
        .catch(error => console.log(error))

}

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

        <View style={[estilo.container]}>
            <MenuAreaRestrita title="Cadastro de Produto" />

                <View style={[estilo.containerCentral]}>

                <View style={[css.profile__formRec]} >

                    <TextInput style={[estilo.textCadastro]}
                    placeholder='ID PACIENTE'
                    onChangeText={text => setIdcli(text)}
                    value={idcli}

                     />
                <TextInput style={[estilo.textCadastro]}
                    placeholder='Descrição do Produto/Serviço'
                    onChangeText={text => setProduct(text)}
                    value={product}

                     />
                     <Modal
                       setProps={setIdTipo} 
                     />
                
                 <TouchableOpacity 
                    style={[css.cadastro__button]}
                    onPress={()=>{salvarForm()}}
                    >
                        <Text style={[css.cadastro_buttonText]}>Cadastrar</Text>
                    </TouchableOpacity>
                    {response &&(
                    <View>
                            <Image source={{uri:response, height:180, width:180}}
                            />
                            <Button title='Compartilhar' onPress={()=>shareQR()}/>
                   </View>
                )

                }     
                    
                </View>

                <TouchableOpacity   
                    style={[css.cadastro__button_listar]}
                    onPress={()=>{navigation.goBack()}}
                    >
                        <Text style={[css.cadastro_buttonText]}>Listar</Text>
                    </TouchableOpacity>

                </View>
            
 

                
     
        </View> 
            
    ); 
}
const estilo = StyleSheet.create({
container:{
    width:"100%"
},
containerCentral:{

    marginLeft:10,
    marginRight:10,
   
},
textCadastro:{
    flexDirection:"row",
    justifyContent:"space-between",
    fontSize:14,
    color:"#333",
    backgroundColor:'#fff',
    borderRadius:5,
    margin:5,
    padding:10,
    borderWidth: 0.5,
    borderColor: "#fff",
}
});