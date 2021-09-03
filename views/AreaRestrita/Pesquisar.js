import React, { useState,useEffect } from 'react';
import {  View, TextInput,TouchableOpacity,Text,StyleSheet } from 'react-native';
import css from '../../assets/css/Css';
import { BarCodeScanner } from 'expo-barcode-scanner';
import config from '../../config/config';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import FontAwesome from 'react-native-vector-icons/FontAwesome';  
import AntDesign from 'react-native-vector-icons/AntDesign';  
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';

export default function Pesquisar({navigation}){
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState(null);
  const [local, setLocal] = useState(null);
  const [code, setCode] = useState('none');
  const [data,setData] = useState([]);
  const [displayQr,setDisplayQr] = useState('flex');
  const [displayForm,setDisplayForm] = useState('none');
  const [loading,setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    if(scanned==false){
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }
  }, [scanned]);
  async function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    setDisplayQr('none');
    setDisplayForm('flex');
    setCode(data);
    await getLocation();
    await buscarproduto(data);
    
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  async function buscarproduto(codigo){

  await api.post('/produto/cod',{id:codigo})
    .then(({ data }) => {
      setCode(data[0].codigo);
      setLoading(false);
     // console.log("defaultApp -> data", data);
      setData(data.resultado);
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}
  
  async function searchProduct(codigo){
          let response = await fetch(config.urlRoot+'searchProduct',
          {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                    code:codigo
            })
    });
    let json = await response.json();
    setProduct(json.name);
       
  }
  //retorna a posição e endereço do usuário

  async function getLocation(){
        let location = await Location.getCurrentPositionAsync({});
        //console.log(location);
        Geocoder.init("xxxxxxxxxxxxxxxxxxxxxxxxx");
  }

   function abrirdetalhes(){
       navigation.navigate('Fluxo',{
      codigo:code
  })
}


    return(

      <View >
        <MenuAreaRestrita title="Pesquisar Produto" />
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined :value=> handleBarCodeScanned(value)}
        style={[estilo.qr__code(displayQr)]}
      />
      <View style={[estilo.qr__form(displayForm)]}>
        <View style={[estilo.conteiner]}>

        <TouchableOpacity 
                    style={[estilo.abrircadastro__button]}
                    onPress={()=>{abrirdetalhes()}}
                    >
                <FontAwesome
                                              raised
                                              style={{marginRight:10}}
                                              name='qrcode'
                                              type='font-awesome'
                                              color='white'
                                              size={24} />

       
        <Text style={[estilo.textabrircadastro__button]}>

          {code}
          </Text>
        </TouchableOpacity>
        </View>
        
        

        <View >

        <TouchableOpacity 
                    style={[estilo.lerqcode__button]}
                    onPress={()=>navigation.navigate('Home')}>

                        <Text style={[estilo.textlerqcode__button]}>
                        <AntDesign
                                              raised
                                              name='reload1'
                                              type='antdesign'
                                              color='#6495ed'
                                              size={18} />          
                          Repetir Leitura
                          
                          </Text>
        </TouchableOpacity>
           </View>
      </View>
 </View> 
            
    );
}
const estilo = StyleSheet.create({
  conteiner:{
   padding:10,
  },
  cardcodigo:{
    flexDirection:"row",
      borderWidth:1,
      borderColor:"black",
      borderRadius:5,
      padding:5,
      margin:20
  },
  abrircadastro__button:{
    flexDirection:"row",
    padding:12,
    backgroundColor:"#1e90ff",
    alignSelf:"center",
    justifyContent:"center",
    borderRadius:5,
    width:"72%",
    marginBottom:10
  },
  lerqcode__button:{
    padding:12,
    backgroundColor:"#7af9c2",
    alignSelf:"center",
    borderRadius:5,
    width:"72%",
    marginBottom:10
  },
  textcode:{
            //fontWeight:"bold",
            fontSize:14,
            color:`#00008b`,
            fontWeight:"bold",
            marginLeft:10           
            //backgroundColor:'#333',

          
  },
  qr__code:(display='flex')=>({
    width:'80%',
    height:'80%',
    alignSelf:"center",
    background:'#000',
    justifyContent:'center',
    display: display
}),
qr__form:(display='none')=>({
        width:'100%',
        display:display
}),
  textabrircadastro__button:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center",
   
  
  },
  textlerqcode__button:{
    color:"#1e90ff",
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center"
  }
});
