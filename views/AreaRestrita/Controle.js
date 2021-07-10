import React, { useState,useEffect } from 'react';
import { 
    View, 
    TextInput,
    Text,
    TouchableOpacity,
    Image,StyleSheet, 
    Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  
import config from '../../config/config';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';
import MenuPrincipal from '../../assets/Components/MenuPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';



export default function Controle({navigation }){

    return(
      
        <View style={[estilo.conteiner]}> 
        <MenuPrincipal/>
        <View>
            <Text style={[estilo.texttitulo]}>App de Controle de Processos</Text></View>
        <View style={[estilo.conteiner__centro]}>

            <View style={[estilo.conteiner2]}>
            <TouchableOpacity
             style={[estilo.card]}>
            <Icon
                            raised
                            name='id-badge'
                            type='font-awesome'
                            color='#f08080'
                            size={30}
                            />
                            <Text style={[]}>Perfil</Text>
                    
            </TouchableOpacity>
            <TouchableOpacity
            style={[estilo.card]}>
            <Icon
                            raised
                            name='users'
                            type='font-awesome'
                            color='#f08080'
                            size={30}
                            />
                    <Text style={[]}>Usuários</Text>
                </TouchableOpacity>
        </View>
            <View style={[estilo.conteiner2]}>
            <TouchableOpacity
             style={[estilo.card]}
             onPress={()=>{navigation.navigate('Cadastro')}}
             >
            <Icon
                            raised
                            name='edit'
                            type='font-awesome'
                            color='#f08080'
                            size={30}
                            />
                            <Text style={[]}>Cadastro Produto</Text>
                    
            </TouchableOpacity>
                <TouchableOpacity
                 style={[estilo.card]}
                 onPress={()=>{navigation.navigate('Pesquisar')}}
                 >
            <Icon
                            raised
                            name='qrcode'
                            type='font-awesome'
                            color='#f08080'
                            size={30}
                            
             />
                     <Text style={[]}>Pesquisar</Text>     
                </TouchableOpacity>
        </View>
            <View style={[estilo.conteiner2]}>
            <TouchableOpacity
             style={[estilo.card]}
             onPress={()=>{navigation.navigate('ListProduct')}}
             >
            <Icon
                            raised
                            name='list-ul'
                            type='font-awesome'
                            color='#f08080'
                            size={30}
                            />
                            <Text style={[]}>Produtos</Text>
                    
            </TouchableOpacity>
                <TouchableOpacity
                 style={[estilo.card]}
                 onPress={()=>{navigation.navigate('Pesquisar')}}
                 >
            <Icon
                            raised
                            name='print'
                            type='font-awesome'
                            color='#f08080'
                            size={30}
                            />
                     <Text style={[]}>Relatórios</Text>     
                </TouchableOpacity>
        </View>
            <View style={[estilo.conteiner2]}>
            <TouchableOpacity
             style={[estilo.card]}
             onPress={()=>{navigation.navigate('Cadastro')}}
             >
            <Icon
                            raised
                            name='hourglass'
                            type='font-awesome'
                            color='#f08080'
                            size={30}
                            />
                            <Text style={[]}>Etapas</Text>
                    
            </TouchableOpacity>
                <TouchableOpacity
                 style={[estilo.card]}
                 onPress={()=>{navigation.navigate('Pesquisar')}}
                 >
            <Icon
                            raised
                            name='print'
                            type='font-awesome'
                            color='#f08080'
                            size={30}
                            />
                     <Text style={[]}>Relatórios</Text>     
                </TouchableOpacity>
        </View>

        </View>
    </View>
            
    )
}
const estilo = StyleSheet.create({
    conteiner:{
      marginBottom:10,
      
  
   
      
     alignItems:"center",
   
    },
    conteiner__centro:{
 
      marginTop:10,
      
      padding:5,
  
     alignItems:"center",
   
    },
    conteiner2:{
        flexDirection:"row"
    },
    card:{
        
        borderWidth:1,
        alignItems:"center",
        borderColor:"#00a3e9",
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
    }
});