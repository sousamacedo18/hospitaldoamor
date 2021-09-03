import React, { useState,useEffect, useRef } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    StyleSheet, 
    FlatList,
    Alert,
    SafeAreaView
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';  
import Feather from 'react-native-vector-icons/Feather';  
import config from '../../config/config';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import Moment from 'moment';
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';



export default function Fluxo({ route, navigation }){
    const {codigo} = route.params;
    const {id} = route.params;
    //const produto = route.params.item;

    const [nome,setNome]=useState();
    //const [matricula,setMatricula]=useState();

    const [idu,setIdU]=useState(0);
    const [idtipo,setIdTipo]=useState(0);
    const [idun,setIdun]=useState(0);
    const [idpcli,setIdCli]=useState();
    const [idfluxo,setIdfluxo]=useState();
    const [nomefluxo,setNomefluxo]=useState("Selecione a Etapa");
    const [descricao,setDescricao]=useState();
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [idestado,setIdestado] = useState();


useEffect(()=>{
    buscarproduto(codigo);
   
},[])


useEffect(()=>{
   escolherfluxo(); 
},[idtipo])

async function buscarproduto(codigo){
    await api.get(`/produtos/cod/${codigo}`)
    .then(({ data }) => {
      setIdTipo(data[0].idtipo);
      setNome(data[0].nometipo);
      setData(data.resultado);
  
    })
    .catch((error) => console.error(error))
    .finally(() =>{buscartimeline(codigo);});
}
async function buscartimeline(codigo){
   await api.get(`/timeline/${codigo}`)
    .then(({ data }) => {
      setData1(data.resultado);
    })
    .catch((error) => console.error(error))
    .finally(() =>{});
}
function excluirProduto(id){
  Alert.alert(
    "Atenção",
    "Deseja Excluir esse produto?",
    [
      {
        text: "Não",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Sim", onPress: () => {
         api.get(`/produto/deletar/${id}`)
        .then(({ data }) => {
            
            navigation.goBack();
         
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      } }
    ]
  );
}
function modificarfluxo(idfluxo,nomefluxo){
  Alert.alert(
    "Atenção",
    "Deseja Modificar o estado deste produto?",
    [
      {
        text: "Não",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Sim", onPress: () => {
        navigation.navigate('DetalhesProduto',{
          id:codigo,
          idFluxo:idfluxo,
          nomeFluxo:nomefluxo,
      })       
      } 
    }
    ]
  );
}
async function escolherfluxo(){
  
    await api.post('/fluxo',{
       id:idtipo,
       code:codigo
     })
     
       .then(({ data }) => {
         console.log("dados do fluxo-> data", data)
         setData(data)
       })
       .catch((error) => console.error(error))
       .finally(() => {});
}


    return(
        <View style={[estilo.conteiner]}> 
          <MenuAreaRestrita title="Fluxo"/>
            <View style={[estilo.containerbotoestop]}>
              <View   >
                <View style={[estilo.conteinerTop]}>
              <Text >
                  <FontAwesome
                                                    raised
                                                    name='qrcode'
                                                    type='fontawesome'
                                                    color='#6495ed'
                                                    size={18} /> 
                      
        
                </Text>
                <Text style={[estilo.tituloConteiner]}> {codigo} </Text> 
                </View>
                <View style={[estilo.conteinerTop]}>
                        <Text>
                              <MaterialCommunityIcons
                                                                raised
                                                                name='wheelchair-accessibility'
                                                                type='materialcommunityicons'
                                                                color='#6495ed'
                                                                size={18} /> 
                            </Text>   
                            <Text style={[estilo.tituloConteiner]} >{nome}</Text>  
                </View>  
             

                </View>
                      <View >
                      <FontAwesome
                                                    raised
                                                    name='trash-o'
                                                    type='fontawesome'
                                                    color='#ff0000'
                                                    onPress={()=>{excluirProduto(id)}}
                                                    size={30} /> 
                        </View>     
                </View>
             
                <View style={[estilo.conteinerEscolha]}>
  
                        <View >
                        <SafeAreaView>
                        <FlatList
                                data={data}
                                keyExtractor = { (item, index) => index.toString() }
                              
                                renderItem={({ item }) => (
                              
                                <TouchableOpacity 
                                onPress={()=>{modificarfluxo(item.id,item.nomefluxo)}}
                                style={[estilo.cardPrincipal]}
                                      >
                            <View style={[estilo.button_escolha]}>
                                  <View style={[estilo.subButton_escolha1]}>
                                        <Text style={[estilo.titulofluxo]}>{item.nomefluxo}</Text>
     
                                  </View>
                                  <View style={[estilo.subButton_escolha2]}>
                                    {item.dias!==null &&
                                  <Text style={[]}>
                                        <Feather
                                              raised
                                              name='calendar'
                                              type='font-awesome'
                                              color='#6495ed'
                                              size={12} />
                                          <Text style={[estilo.subtitulos]}> {item.dias}</Text></Text>
                                          }
                                      {item.horas!==null &&
                                      <Text style={[estilo.cardHora]}>
                                      <Feather
                                              raised
                                              name='clock'
                                              type='font-awesome'
                                              color='#6495ed'
                                              size={16} />
                                      <Text style={[estilo.subtitulos]}> {item.horas}</Text></Text>
                                }
                                </View>
                             </View>
                             <View style={[estilo.buttonNav]}>
                             {/* <Feather
                                              raised
                                              name='arrow-right'
                                              type='font-awesome'
                                              color='#f08080'
                                              size={24} /> */}
                             </View>
                              </TouchableOpacity>
                              
                                )}
                            />
                            </SafeAreaView>
                        </View>
                
                </View> 
      

            </View>
    )
}
const estilo = StyleSheet.create({
    conteiner:{
        height:"100%",
        width:"100%",
    },
     conteinerTop:{
        flexDirection:"row"
     },
     containerbotoestop:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:20,
        backgroundColor:"#fff",
     },
     tituloConteiner:{
      marginLeft:10
     },
    conteinerEscolha:{
        flexDirection:"row",
        marginTop:5,
        padding:10,
    },
    cardPrincipal:{
      flexDirection:"row",
      justifyContent:"space-between",
      marginBottom:5,
      width:"95%",
      height:60,
      padding:2,
      padding:5,
      borderRadius:6,
      elevation:3,
      backgroundColor:'#fff',
      shadowOffset:{width:1, height:1},
      shadowColor:'#333',
      shadowOpacity:0.3,
      shadowRadius:2,
      marginHorizontal:4,
      marginVertical:6,
      padding:10
    
    },
    buttonNav:{
      
      justifyContent:'center',
      marginRight:10,
      
    },
    subButton_escolha1:{
      flexDirection:"row",
      justifyContent:"space-between",
  
    },
    subButton_escolha2:{
    flexDirection:"row",
    },
    cardHora:{
        marginLeft:50 
    },

    titulofluxo:{
      fontWeight: "bold",
    
    },

    subtitulos:{
      color:'#f08080'
    }

});