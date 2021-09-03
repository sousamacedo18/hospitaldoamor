import React, { useState,useEffect } from 'react';
import { 
    View, 
    TextInput,
    Text,
    TouchableOpacity,
    Image,StyleSheet, 
    Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import config from '../../config/config';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';



export default function Controle({navigation }){
    async function logout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
            }
    return(
      
        <View style={[estilo.conteiner]}>


          <View style={[estilo.containerTop]} >
          <View style={[estilo.buttonExit]}>
            <TouchableOpacity
            onPress={()=>{logout()}}
            >
            
            <MaterialIcons
                            raised
                            name='exit-to-app'
                            type='MaterialIcons'
                            color='#1e90ff'
                            size={30}
                            
             />               
            </TouchableOpacity>

            </View>
            <View style={[estilo.logoTop]}>
            <Image source={require('../../assets/img/logo5.png')}
             
             style={{ width: 330, height: 150,resizeMode:"contain" }}
            />
               {/* <Text style={[css.login__textLogo1]}>Registro de Processos</Text> */}
               
            </View>

            </View>

        <View style={[estilo.conteiner__centro]}>


            <View style={[estilo.conteiner2]}>

                <TouchableOpacity
                 style={[estilo.card]}
                 onPress={()=>{navigation.navigate('Pesquisar')}}
                 >
            <Icon
                            raised
                            name='qrcode'
                            type='font-awesome'
                            color='white'
                            size={30}
                            
             />
                     <Text style={[estilo.titulocard]}>Pesquisar</Text>     
                </TouchableOpacity>
                <TouchableOpacity
             style={[estilo.card]}
             onPress={()=>{navigation.navigate('ListProduct')}}
             >
            <Icon
                            raised
                            name='list-ul'
                            type='font-awesome'
                            color='white'
                            size={30}
                            />
                            <Text style={[estilo.titulocard]}>Produtos</Text>
                    
            </TouchableOpacity>
        </View>
            <View style={[estilo.conteiner2]}>

                <TouchableOpacity
                 style={[estilo.card]}
                 onPress={()=>{navigation.navigate('Pesquisar')}}
                 >
            <Icon
                            raised
                            name='print'
                            type='font-awesome'
                            color='white'
                            size={30}
                            />
                     <Text style={[estilo.titulocard]}>Relatórios</Text>     
                </TouchableOpacity>
                <TouchableOpacity
            
            style={[estilo.card]}
            onPress={()=>{navigation.navigate('ListUsuarios')}}
            >
                
               
            <Icon
                            raised
                            name='users'
                            type='font-awesome'
                            color='white'
                            size={30}
                            />
                    <Text style={[estilo.titulocard]}>Usuários</Text>
         </TouchableOpacity>
        </View>


        </View>
    </View>
            
    )
}
const estilo = StyleSheet.create({
    conteiner:{

     flexDirection:"column",
     justifyContent:"space-between",
     height:"100%",
     backgroundColor:"white",
   
    },
    containerTop:{
        backgroundColor:"white",
        justifyContent:"center",
       
        width:"100%",
        flex:1,
    },
    buttonExit:{
                alignItems:"flex-end",
                marginRight:25
    },
    logoTop:{
            alignItems:"center",
            
    },
    conteiner__centro:{
 
        backgroundColor:"white",
        justifyContent:"flex-start",
        alignItems:"center",
        width:"100%",
        flex:1,

     
   
    },
    conteiner2:{
       
        flexDirection:"row"
    },
    card:{


        borderWidth:1,
        borderColor:"#1e90ff",
        alignItems:"center",
        backgroundColor:"#1e90ff",
        borderRadius:5,
        padding:5,
        width:"40%",
        height:100,
        marginLeft:10,
        marginBottom:10,
        justifyContent:"center"
        
    },
    cadastro__button:{
        padding:12,
        backgroundColor:"#F58634",
        alignSelf:"center",
        marginLeft:10,
        marginRight:10,
        borderRadius:5,
        marginTop:5,
        width:"90%",
        backgroundColor:"#6495ed",
       
    },
    conteinerButton:{
        width:'100%',
        
        marginTop:10,
        marginBottom:10
    
    },
    cadastro__buttonText:{
        textAlign:'center',
        fontWeight:"bold",
        fontSize:22,
        color:"#fff"
    },
    texttitulo:{
        marginTop:20,
        textAlign:'center',
        fontWeight:"bold",
        fontSize:16,
        color:"#00008b"
    },
    titulocard:{
      
        textAlign:'center',
     
        fontSize:12,
        color:"white"
    }
});