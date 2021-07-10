import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import css from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../config/config';
import api from '../../services/api';



import {
  Text,
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function ListProduct({navigation}){

const [idUser,setIdUser]=useState(null);
const [data,setData] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [loading,setLoading] = useState(false);

useEffect(() => {
  listarProdutos();
},[]);

async function listarProdutos(){
 await api.get('/produtos')
    .then(({ data }) => {
      console.log("defaultApp -> data", data.resultado)
      setData(data.resultado);
      console.log(data);
     
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}
async function excluirProduto(i){
        await api.get('/produto/excluir',{
          id:i
        })
    .then(({ data }) => {
        listarProdutos();
     
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}
// async function sendForm(){
 
//   let response = await fetch(`${config.urlRoot}verifyPass`, {
//     method: 'POST',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//     body: JSON.stringify({
//         id: idUser,
//         senhaAntiga: senhaAntiga,
//         novaSenha:novaSenha,
//         ConfnovaSenha:ConfnovaSenha

//   })
// });
//   let json=await response.json();
   
//   setMsg(json);
// }

const renderItem = ({ item }) => {
  const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
  const color = item.id === selectedId ? 'white' : 'black';

  return (
    <Item
      item={item}

      //onPress={()=>{escolherTipo(item.id,item.descricao)}}
      //onPress={() => setSelectedId(item.id)}
      backgroundColor={{ backgroundColor }}
      textColor={{ color }}
    />
  );
};
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <View style={[estilo.cardproduto]}>
    <View style={[estilo.subcard]}>
    <Text >ID Paciente: {item.idpcli}</Text>
    {/* <Text style={[estilo.text_button_escolha]}>{item.descricao}</Text> */}

            <Icon
              raised
              name='folder-open'
              type='font-awesome'
              color='#f08080'
              size={18}
              onPress={()=>navigation.navigate('DetalhesProduto',{
                //id:item.codigo
                item
            })}
            
            
              />
    </View>

      <View style={[estilo.subcardButtom]}>
        
        <Text style={[estilo.text_subcardButtom]}>Descrição: {item.descricao}</Text>
        <View style={[estilo.subcard]}>
        <Text style={[estilo.text_subcardButtom]}>Qrcode: {item.codigo}</Text>
        <Icon
              raised
              name='trash'
              type='font-awesome'
              color='#f08080'
              size={18}
              onPress={()=>{excluirProduto(item.id)}}
            
            
              />
        </View>
 
        
        <Text style={[estilo.text_subcardButtom]}>Tipo: {item.nometipo}</Text>
       
        </View>
  </View>
);

    return(

     
  

      <View style={[estilo.container]} >

           <Text style={[estilo.tituloText]}>Lista de Produtos</Text>
           <View>
           <TextInput style={[estilo.cadastro__inputText]}
                    placeholder='Pesquisar'
             
            />
           </View>
            <View style={[estilo.conteiner_lista]}>
           <FlatList
                    data={data}
                    //initialNumToRender={data.length}
                    renderItem={renderItem}
                 
                    keyExtractor={(item, index) => item.id.toString()}
                    extraData={selectedId}
                   
                    onEndReachedThreshold={0.1}
                    
                  />
            </View>
  
      </View> 
      
            
    ); 
}
const estilo = StyleSheet.create({
  modal:{
    backgroundColor:"#dcdcdc",
    margin:20,
    padding:20,
   borderRadius:5,
    elevation:10
  },
  conteiner_retorno:{
    marginBottom:15,
  },
  button_retorno:{
    alignItems:'flex-end',
   
  },
  conteiner_lista:{

      height:'88%',
  },
  cadastro__inputText:{
    //fontWeight:"bold",
    fontSize:14,
    color:"#333",
    //backgroundColor:'#333',
    borderRadius:5,
    margin:5,
    padding:5,
    borderWidth: 0.5,
    borderColor: "#20232a",
  
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
  button_fechar:{
    padding:12,
    backgroundColor:"#f08080",
    alignSelf:"center",
    marginTop:50,
    borderRadius:5,
    width:"100%"
  },
  text_button_escolha:{
    fontWeight:"bold",
    fontSize:16,
    color:"#191970",
    alignSelf:"center"
  },
  text_button_fechar:{
    fontWeight:"bold",
    fontSize:15,
    color:"#fff5ee",
    alignSelf:"center"
  },
  button_abrir:{
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
  text_button_abrir:{
    fontSize:14,
    color:"#708090",
   
  },
  container: {
width:"90%",
alignSelf:"center",
paddingBottom:20
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  tituloText:{
    fontSize: 16,
    color:"#708090",
    alignSelf:"center",
    marginTop:10,
    marginBottom:10
  },
  titulo:{
    marginBottom:30
  },
  cardproduto:{

    borderWidth:1,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
    borderColor:"black",
    marginTop:10,
    height:100,
    paddingTop:5,
    //backgroundColor:"#fdf5e6",
    paddingRight:10,
    paddingLeft:10,
  },
  subcard:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  subcardButtom:{
    textAlign:"left"
  }
})