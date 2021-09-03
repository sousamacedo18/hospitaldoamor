import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';

import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import FAB from 'react-native-fab';



import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function DetailUsuario({route,navigation}){
  const {id} = route.params;
  const [nome,setNome]= useState("");
  const [nomeunidade,setNomeunidade]= useState("");
  const [idund,setIdund]=useState("");
  const [user,setUser]=useState("");
  const [nivel,setNivel] = useState('');
  const [matricula,setMatricula]= useState("");
  const [data,setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading,setLoading] = useState([]);


              const dados = {
                  nome,
                  idund,
                  matricula,
                  nivel
              }

useEffect(() => {
  buscarcadastro(id);
  console.log(id);
},[]);

async function buscarcadastro(idusuario){
 await api.post('/usuario/editar',{id:idusuario})
    .then(({ data }) => {
      setData(data);

   
     
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
    

    
    <View style={[]}>
         <Text >ID Usuário: {item.id}</Text>
        <Text style={[estilo.text_subcardButtom]}>Nome: {item.nome}</Text>
        <Text style={[estilo.text_subcardButtom]}>Matrícula:<Text> {item.matricula}</Text></Text>
        <Text style={[estilo.text_subcardButtom]}>Unidade:<Text> {item.nomeunidade}</Text></Text>
        {/* <Text style={[estilo.text_subcardButtom]}>Tipo: {item.nometipo}</Text> */}
        <View style={[estilo.containerButtonBottom]}>
        <TouchableOpacity
                     style={[estilo.buttonEditar]}
                    // onPress={()=>sendForm()}
                    onPress={()=>{navigation.navigate('EditarUsuario',{id:item.id}
                    
                    )}}
                     >
                       <View style={{flexDirection:"row"}}>
                       <Icon name="edit" size={20} color="#fff" />
                        <Text style={{color:"#fff"}}>Alterar</Text>
                        </View>
      </TouchableOpacity>
        <TouchableOpacity
                     style={[estilo.buttonExcluir]}
                    // onPress={()=>sendForm()}
                     onPress={()=>excluirUsuarios(item.id)}
                     >
                       <View style={{flexDirection:"row"}}>
                       <Icon name="trash-o" size={20} color="#ff0000" />
                        <Text style={{color:"#ff0000"}}>Excluir</Text>
                        </View>
      </TouchableOpacity>
      </View>
    </View>
   

  </View>
);

    return(
      <View style={[estilo.container]} >
        <MenuAreaRestrita title="Detalhes Usuário"/>
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

  search:{
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
  containerButtonBottom:{
     flexDirection:"row",
     justifyContent:"space-between"
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

      width:'95%',
      alignSelf:'center'
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
      width:"100%",
      alignSelf:"center",

      
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
  buttonEditar:{
    elevation: 8,
    backgroundColor: "#1e90ff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:10,
    height:45,
    alignItems:"center",
    marginTop:20,
    width:"40%"
},
  buttonExcluir:{
    elevation: 8,
    backgroundColor: "#fffaf0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:10,
    height:45,
    alignItems:"center",
    marginTop:20,
    width:"40%"
},

})