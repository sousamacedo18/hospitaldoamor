import React, {useState} from 'react'
import {View, Text,Button, Modal, StyleSheet,TouchableOpacity,FlatList,SafeAreaView,StatusBar,ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react/cjs/react.development';
import api from '../../services/api';

export default function ({setProps,value}){
  const [visible,setVisible]=useState(false);
  const [tipo,setTipo]=useState("Mudar Estado");
  const [listas,setListas] = useState([]);
  const [idtipo,setIdipo]=useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  function escolherTipo(id,tipo){
      setTipo(tipo);
      setIdipo(id);
      setVisible(false);
      setProps(id);

  }
  useEffect(() => {

    
  },[])

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={()=>{escolherTipo(item.id,item.nomeestado)}}
        //onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[estilo.button_escolha]}>
      <Text style={[estilo.text_button_escolha]}>{item.nomeestado}</Text>
      <Icon
        raised
        name='check'
        type='font-awesome'
        color='#f08080'
        size={18} />
    </TouchableOpacity>
  );

  

    useEffect(() => {
     api.get('/estado')
        .then(({ data }) => {
          //console.log("defaultApp -> data", data.resultado)
          setData(data.resultado)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

       return(
         <View >
           <Modal 
           animationType="slide"
           transparent={true}
           visible={visible}
          
       
           >
             <View style={estilo.modal}>
            <View style={estilo.conteiner_retorno}>
                  <TouchableOpacity 
                  
                          style={estilo.button_retorno}
                          onPress={()=>{setVisible(false)}}
                  >
                    <Icon name="times" size={20} color="#ff0000" />
                      
                  </TouchableOpacity>
            </View>
          <View style={estilo.titulo}>
            <Text  style={estilo.tituloText}>Escolher o estado</Text>
          </View>
            <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                  />
               

            <TouchableOpacity 
                    style={[estilo.button_fechar]}
                    onPress={()=>{setVisible(false)}}
            >
                <Text style={estilo.text_button_fechar}>Fechar</Text>
            </TouchableOpacity>

            </View>

           </Modal>
           <TouchableOpacity 
                    style={[estilo.button_abrir]}
                    onPress={()=>{setVisible(true)}}
            >
                <Text style={estilo.text_button_abrir}>{tipo}</Text>
                <Icon name="angle-down" size={20} color="#6495ed" />
            </TouchableOpacity>
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
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    alignSelf:"center"
  },
  titulo:{
    marginBottom:30
  }
})