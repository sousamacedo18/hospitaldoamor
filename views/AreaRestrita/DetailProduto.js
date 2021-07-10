import React, { useState,useEffect, useRef } from 'react';
import { 
    View, 
    TextInput,
    Text,
    TouchableOpacity,
    Image,StyleSheet, 
    Button,
    FlatList,
    KeyboardAvoidingView,
    ListItem
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';  
import config from '../../config/config';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Modalfluxo from 'react-native-modal';
import Modalescolha from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';



export default function DetailProduto({ route, navigation }){
    //const {id} = route.params;
    const produto = route.params.item;
    const [codigo,setCodigo]=useState();
    const [idtipo,setIdtipo]=useState();
    const [nome,setNome]=useState();
    //const [matricula,setMatricula]=useState();
    const [iduser,setIdUser]=useState(0);
    const [idu,setIdU]=useState(0);
    const [idund,setIdund]=useState(0);
    const [idun,setIdun]=useState(0);
    const [idpcli,setIdCli]=useState();
    const [idfluxo,setIdfluxo]=useState();
    const [nomeund,setNomeund]=useState();
    const [nometipo,setNometipo]=useState();
    const [nomefluxo,setNomefluxo]=useState("Selecione a Etapa");
    const [descricao,setDescricao]=useState();
    const [desc,setDesc]=useState();
    const [data,setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading,setLoading] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [counter, setCounter] = useState(0);
    const [estado,setEstado] = useState('Selecione o Estado');
    const [idestado,setIdestado] = useState();
    const [visible,setVisible] = useState(false);
    const [visible1,setVisible1] = useState(false);


    const dados = {
      
        descricao,
        idpcli,
        idfluxo,
        estado,
        idun,
        idu,
        idtipo,
        idfluxo
    }



  function mudar(){
      if(counter<5){
        setCounter(counter+1);
          if(counter==1){
              setEstado('INICIAR');
          }
          if(counter==2){
              setEstado('PAUSAR');
          }
          if(counter==3){
              setEstado('REINICIAR');
          }
          
          if(counter==4){
              setEstado('PARAR');
          }
          if(counter==5){
              setEstado('FINALIZAR');
          }
            
  }else{
    setCounter(0);
   
  }
}
function escolherfluxo(){
 
    api.post('/fluxo',{
       id:produto.idtipo
     })
     
       .then(({ data }) => {
         console.log("dados do fluxo-> data", data)
         setData2(data)
       })
       .catch((error) => console.error(error))
       .finally(() => setLoading(false));
}
function escolhaestado(){
    api.get('/estado')
    .then(({ data }) => {
      console.log("Estado -> data", data.resultado)
      setData1(data.resultado);
     
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}


    useEffect(() => {
      //sendForm()
     // dadosproduto();


      },[]);
      
      useEffect(()=>{
         escolherfluxo();
         escolhaestado();
      },[idtipo])

     async function escolherFluxo(id,nome){
        setNomefluxo(nome);
        setIdfluxo(id);
        setVisible(false); 
        let resData=await AsyncStorage.getItem('userData');
        let json = JSON.parse(resData);
        //console.log(json.idund)
           
            setIdU(json.idusu);
            setIdun(json.idund);
         

  
    }
    async function escolherEstado(id,tipo){
        setEstado(tipo);
        setIdestado(id);
        setVisible1(false);
        let resData=await AsyncStorage.getItem('userData');
        let json = JSON.parse(resData);
        //console.log(json.idund)    
            setIdU(json.idusu);
            setIdun(json.idund);
  
    }
    async function salvarForm(){
   
        await api.post('/produto/cadtime',dados)
        .then(response => { 
            setResponse(response.data);
            console.log(response.data);
           //return response; 
        })
        .catch(error => console.log(error))


    }
    return(
        <View style={[estilo.conteiner]}> 
        <Text>Produto</Text>
        <View style={[estilo.cardproduto]}>
            <Text>Descrição: {produto.descricao}</Text>
            <Text>Tipo: {produto.nometipo}</Text>
            <Text>ID paciente: {produto.idpcli}</Text>
            <Text>QRCode: {produto.codigo}</Text>
            <Text>Matrícula:{produto.mat}</Text>
        </View>
       
        <KeyboardAvoidingView style={[estilo.conteinerButton]}>
        <>
            
             <Text>Escolha a Etapa</Text>
                <View style={[estilo.conteinerEscolha]}>
                  
               < Text style={[estilo.inputText1]}>{nomefluxo}</Text>
                 
                    <TouchableOpacity 
                    style={[estilo.button_abrir]}
                    onPress={()=>{setVisible(true)}}
                        >
                           
                        <Icon name="angle-down" size={20} color="#6495ed" />
                        </TouchableOpacity>
                 
                    <Modalfluxo 
                    onBackButtonPress={()=>setVisible(false)}
                    swipeDirection={['up','down','right']}
                    onSwipeComplete={()=>setVisible(false)}
                    isVisible={visible}>
                        <View style={{backgroundColor:'white', height:'auto', padding:10}}>
                        <FlatList
                                data={data2}
                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={({ item }) => (
                              
                                <TouchableOpacity 
                                onPress={()=>{escolherFluxo(item.id,item.nomefluxo)}}
                                style={[estilo.button_escolha]}>
                             <Text style={[]}>{item.nomefluxo}</Text>
                                <Icon
                                  raised
                                  name='check'
                                  type='font-awesome'
                                  color='#f08080'
                                  size={18} />
                              </TouchableOpacity>
                              
                                )}
                            />
                        </View>
                    </Modalfluxo>
                </View> 
                <Text>Escolha o Estado</Text>
        <View style={[estilo.conteinerEscolha]}>
                  
                  <Text style={[estilo.inputText1]}>{estado}</Text>
                  <TouchableOpacity 
                    style={[estilo.button_abrir]}
                    onPress={()=>{setVisible1(true)}}
                        >
                           
                            <Icon name="angle-down" size={20} color="#6495ed" />
                        </TouchableOpacity>
                <Modalescolha
                    onBackButtonPress={()=>setVisible1(false)}
                    swipeDirection={['up','down','right']}
                    onSwipeComplete={()=>setVisible1(false)}
                    isVisible={visible1}>
                        <View style={{backgroundColor:'white', height:'auto', padding:10}}>
                            
                            
                        <FlatList
                                data={data1 }
                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={({ item }) => (
                              
                                <TouchableOpacity 
                                onPress={()=>{escolherEstado(item.id,item.nomeestado)}}
                                style={[estilo.button_escolha]}>
                             <Text style={[]}>{item.nomeestado}</Text>
                                <Icon
                                  raised
                                  name='check'
                                  type='font-awesome'
                                  color='#f08080'
                                  size={18} />
                              </TouchableOpacity>
                              
                                )}
                            />
                        </View>
                </Modalescolha>
                </View>
        </>

                <View>
                     {idestado>1&&(
                         <>
                         <Text>Descreva o motivo deste estado</Text>
                    <TextInput
                            onChangeText={text => setDescricao(text)}
                            value = {descricao}
                            placeholder={'Digite o motivo aqui...'}
                            multiline={true}
                            numberOfLines={4}
                            style={[estilo.inputText]}>
                           
                    </TextInput>
                    </>
                     )}
                  
                {idestado>0&&(
                <>


                        <TouchableOpacity 
                                style={[estilo.cadastro__button]}
                                onPress={()=>{salvarForm()}}
                                            >
                                <Text style={[estilo.cadastro__buttonText]}>Salvar</Text>
                        </TouchableOpacity> 
                </>
                       
                        )}
            
                </View>

        </KeyboardAvoidingView>
        <View>

        <Text>Detalhes do Processo</Text>
        </View>
        
        <View style={[estilo.cardproduto]}>
        <View>

  <Text>fasdfasdfa</Text>
        </View>

            </View>
            </View>
    )
}
const estilo = StyleSheet.create({
    conteiner:{
   
      margin:5,
      padding:5,
     borderRadius:5,
    },
    cardproduto:{
        borderWidth:1,
        borderColor:"black",
        borderRadius:5,
        padding:5
    },
    cadastro__button:{
        padding:12,
      
        alignSelf:"center",
        marginLeft:10,
        marginRight:10,
        borderRadius:5,
        marginTop:10,
        width:"100%",
        backgroundColor:"#228b22",
       
    },
    conteinerButton:{
        width:'100%',
        marginTop:30,
        marginBottom:10,
        borderWidth:1,
        padding:10,
        borderRadius:5,
    
    },
    cadastro__buttonText:{
        textAlign:'center',
        fontWeight:"bold",
        fontSize:16,
        color:"#fff",
        
    },
    conteinerEscolha:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:10,
        backgroundColor:"white",
        width:"97%",
        borderRadius:6,
        marginTop:5,
        marginLeft:5,
        borderWidth:1,
       
        borderColor:"#c0c0c0",
    },
    inputText:{
        fontSize:14,
        color:"#708090",
        backgroundColor:"#fff",
       
        marginLeft:8,
        marginRight:8,
        padding:10,
        marginTop:20
    },
    inputText1:{
        fontSize:14,
        color:"#708090",
        backgroundColor:"#fff",
        width:"90%",
     
    },
    button_escolha:{
        flexDirection:"row",
        borderWidth:1,
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        borderColor:"#afeeee",
        marginTop:10,
        height:50,
        backgroundColor:"#fdf5e6",
        alignItems:"center",
        justifyContent:"space-between",
        paddingRight:10,
        paddingLeft:10,
    
      },

});