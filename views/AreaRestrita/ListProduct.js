import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import css from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import config from '../../config/config';
import api from '../../services/api';
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';

import FAB from 'react-native-fab';



import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput

} from 'react-native';



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
            
            listarProdutos();
         
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      } }
    ]
  );

}

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
  <TouchableOpacity
  onPress={()=> navigation.navigate('Fluxo',{
                       
    codigo:item.codigo,
    id:item.id
})}
>
  <View style={[estilo.cardproduto]}>


   
        <View style={[]}>
            <Text >ID Paciente: {item.idpcli}</Text>
            <Text style={[estilo.text_subcardButtom]}>Descrição: {item.descricao}</Text>
            <Text style={[estilo.text_subcardButtom]}>Qrcode:<Text> {item.codigo}</Text></Text>
            <Text style={[estilo.text_subcardButtom]}>Tipo: {item.nometipo}</Text>
        </View>
 

  </View>
  </TouchableOpacity>
);

    return(

      <View style={[estilo.container]} >

       <MenuAreaRestrita title="Lista de Produtos"/>

       <View style={[estilo.conteiner_lista]}>
            <View style={[estilo.search]}>
              <Text style={{color:"#A9A9A9"}}>Pesquisar</Text>
              <Feather 
              name="search"
              size={18}
              color="#A9A9A9"
              />
            </View>
        
            
           <FlatList
                    data={data}
                    //initialNumToRender={data.length}
                    renderItem={renderItem}
                 
                    keyExtractor={(item, index) => item.id.toString()}
                    extraData={selectedId}
                   
                    onEndReachedThreshold={0.1}
                    
                  />
            </View>
            <FAB 
            buttonColor="green" 
            iconTextColor="#FFFFFF" 
            // onClickAction={() => {console.log("FAB pressed")}}
            onClickAction={()=>{navigation.navigate('Cadastro')}} 
            visible={true} iconTextComponent=
            {<Icon name="plus"/>} />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
cardproduto:{
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
search:{
  //fontWeight:"bold",
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
  

},

  conteiner_lista:{
      height:"88%",
      width:"95%",
      alignSelf:"center",
  },
  container: {
     width:"100%",
      alignSelf:"center",

    
  },

  tituloText:{
    fontSize: 16,
    color:"#708090",
    alignSelf:"center",
    marginTop:10,
    marginBottom:10
  },

})