import React, { useState,useEffect } from 'react';
import {  View, TextInput,TouchableOpacity,Text,StyleSheet } from 'react-native';
import css from '../../assets/css/Css';
import { BarCodeScanner } from 'expo-barcode-scanner';
import config from '../../config/config';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

import MenuPrincipal from '../../assets/Components/MenuPrincipal';

export default function Pesquisar({navigation}){
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState(null);
  const [local, setLocal] = useState(null);
  const [code, setCode] = useState('none');
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
    api.post('/produto/cod',{id:codigo})
    .then(({ data }) => {
      setCode(data[0].codigo);
      setLoading(false);
      console.log("defaultApp -> data", data);
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

  async function abrirdetalhes(){
       navigation.navigate('DetalhesProduto',{
      id:code
  })
}


    return(

      <View style={[css.container,css.containerTop]}>
     
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined :value=> handleBarCodeScanned(value)}
        style={[css.qr__code(displayQr)]}
      />
      <View style={[css.qr__form(displayForm)]}>
        <View style={[estilo.cardcodigo]}>
        <Text>QrCode: </Text>
        <Text style={[estilo.textcode]}>{code}</Text>
        </View>
        

        <View style={[estilo.conteiner]}>
        <TouchableOpacity 
                    style={[estilo.cadastro__button]}
                    onPress={()=>{abrirdetalhes()}}
                    >
                        <Text style={[estilo.text__button]}>Abrir</Text>
        </TouchableOpacity>
        <TouchableOpacity 
                    style={[estilo.cadastro__button]}
                    onPress={()=>navigation.navigate('Home')}>
                    
                        <Text style={[estilo.text__button]}>Ler QrCode</Text>
        </TouchableOpacity>
           </View>
      </View>
 </View> 
            
    );
}
const estilo = StyleSheet.create({
  conteiner:{

  },
  cardcodigo:{
    flexDirection:"row",
      borderWidth:1,
      borderColor:"black",
      borderRadius:5,
      padding:5,
      margin:20
  },
  cadastro__button:{
    padding:12,
    backgroundColor:"#F58634",
    alignSelf:"center",
    borderRadius:5,
    width:"90%",
    marginBottom:20
  },
  textcode:{
            //fontWeight:"bold",
            fontSize:14,
            color:`#00008b`,
            fontWeight:"bold",
           
            //backgroundColor:'#333',

          
  },
  text__button:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center"
  }
});
