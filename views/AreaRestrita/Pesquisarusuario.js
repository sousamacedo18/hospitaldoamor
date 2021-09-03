import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import FAB from 'react-native-fab';
import { Linking } from 'react-native';
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';



import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function Pesquisarusuario({navigation}){

const [idUser,setIdUser]=useState(null);
const [data,setData] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [loading,setLoading] = useState(false);
const [nome,setNome]=useState("");

useEffect(() => {
  listarUsuarios();
},[]);
async function imprimir(){
  await api.get('/pdf')
  .then(({ data }) => {
    console.log(data);
    console.log("imprimiu")

   
  })
  .catch((error) => console.error(error))
  .finally(() => setLoading(false));
}
async function listarUsuarios(){
 await api.get('/usuarios')
    .then(({ data }) => {
      console.log("defaultApp -> data", data)
      setData(data);
      console.log(data);
     
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}
 function excluirUsuarios(id){
  Alert.alert(
    "Atenção",
    "Deseja Excluir esse usuário?",
    [
      {
        text: "Não",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Sim", onPress: () => {
         api.get(`/usuarios/deletar/${id}`)
        .then(({ data }) => {
            
            listarUsuarios();
         
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
    //   onPress={()=>navigation.navigate('DetalhesUsuario',{
    //     //id:item.codigo
    //     item
    // })}
      backgroundColor={{ backgroundColor }}
      textColor={{ color }}
    />
  );
};
const Item = ({ item, onPress, backgroundColor, textColor }) => (
 
  <View style={[estilo.cardusuarios]}>
     <TouchableOpacity
     onPress={()=>navigation.navigate('DetalhesUsuario',{
          id:item.id
    })} 
     >
    <View style={[]}>
         <Text >ID Usuário: {item.id}</Text>
        <Text style={[estilo.text_subcardButtom]}>Nome: {item.nome}</Text>
        <Text style={[estilo.text_subcardButtom]}>Matrícula:<Text> {item.matricula}</Text></Text>
        {/* <Text style={[estilo.text_subcardButtom]}>Tipo: {item.nometipo}</Text> */}
    </View>
    </TouchableOpacity>

  </View>
);

    return(
     
      <View style={[estilo.container]} >
        <MenuAreaRestrita title="Pesquisar Usuário"/>

          <View style={[estilo.containerCorpo]}>
          <View style={{alignItems:"flex-end"}}>

              <TouchableOpacity onPress={() => Linking.openURL('http://10.0.0.140:5000/pdf/')}>
                <Text style={{color: 'blue'}}>
                <MaterialIcons 
                  name="picture-as-pdf"
                  size={24}
                  color="red"
              />
                
                </Text>
              </TouchableOpacity>
              </View>
             <View style={[estilo.search]}>
             <TextInput style={[estilo.textCadastro]}
                    placeholder='Nome Usuário'
                     onChangeText={text => setNome(text)}
                     value={nome}
                     autoFocus={true}
                     />
              
              <Feather 
              name="search"
              size={18}
              color="#C0C0C0"
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
            <FAB 
            buttonColor="green" 
            iconTextColor="#FFFFFF" 
            // onClickAction={() => {console.log("FAB pressed")}}
             onClickAction={()=>{navigation.navigate('CadastroUsuario')}} 
         
            
            visible={true} iconTextComponent=
            {<Icon name="plus"/>} />
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
  search:{
    flexDirection:"row",
    justifyContent:"space-between",
    fontSize:14,
    color:"#333",
    backgroundColor:'#fff',
    borderRadius:5,
    margin:10,
    padding:10,
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  icon:{

    width:30,
    paddingLeft:10,
    marginBottom:30
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
    fontSize:14,
    color:"#333",
    backgroundColor:'#fff',
    borderRadius:5,
    margin:5,
    padding:5,
    borderWidth: 0.5,
    borderColor: "#fff",
  
},
  container: {
  marginTop:0,
  marginBottom:90
  },
  containerCorpo:{
      marginLeft:10,
      marginRight:10
  },
  cardusuarios:{
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

})