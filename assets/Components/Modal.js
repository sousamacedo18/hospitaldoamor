import React, {useState} from 'react'
import {View, Text,Button, Modal, StyleSheet,TouchableOpacity,FlatList,SafeAreaView,StatusBar,ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react/cjs/react.development';
import api from '../../services/api';

export default function ({setProps,value}){
  const [visible,setVisible]=useState(false);
  const [tipo,setTipo]=useState("Tipo de Produto");
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
        onPress={()=>{escolherTipo(item.id,item.nometipo)}}
        //onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  const Item = ({ item, onPress, backgroundColor, textColor }) => (

    <TouchableOpacity onPress={onPress} style={[estilo.card]} >
      <Text style={{fontSize:14}} >{item.nometipo}</Text>

    </TouchableOpacity>
    

  );

  

    useEffect(() => {
      api.get('/tipo')
        .then(({ data }) => {
         // console.log("defaultApp -> data", data.resultado)
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
             <View style={[estilo.headerModal]}>
                    <TouchableOpacity
                    onPress={()=>{setVisible(false)}}
                    >
                    <Icon name="angle-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={[estilo.textHeader]}>Escolher o tipo produto</Text>
                    <TouchableOpacity
                    onPress={()=>{setVisible(false)}}
                    >
                    <Icon name="close" size={24} color="#ff0000" />
                    </TouchableOpacity>
                    </View>
            <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor = { (item, index) => index.toString() }
                   
                    extraData={selectedId}
                  />
              

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
    height:"100%",
    width:"100%",
    borderRadius:5,
    elevation:10
  },
  headerModal:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:10,
    marginBottom:10,
    height:60,
    backgroundColor:"#fff",
 },
 textHeader:{
  fontSize:16,
  color:"blue"
 },
 card:{
  flexDirection:"row",
  height:50,
  justifyContent:"space-between",
  alignItems:"center",
  borderRadius:6,
  elevation:3,
  backgroundColor:'#fff',
  shadowOffset:{width:1, height:1},
  shadowColor:'#333',
  shadowOpacity:0.3,
  shadowRadius:2,
  marginHorizontal:4,
  marginVertical:6,
  padding:10,

  
  },
  conteiner_retorno:{
    marginBottom:15,
  },
  button_retorno:{
    alignItems:'flex-end',
   
  },
  button_escolha:{
    flexDirection:"row",
    justifyContent:"space-between",
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
    fontSize:14,
    color:"#333",
    backgroundColor:'#fff',
    borderRadius:5,
    margin:5,
    padding:10,
    borderWidth: 0.5,
    borderColor: "#fff",
    
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