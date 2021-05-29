import React, { useState,useEffect } from 'react';
import {  View, TextInput,TouchableOpacity,Text } from 'react-native';
import css from '../../assets/css/Css';
import { BarCodeScanner } from 'expo-barcode-scanner';
import config from '../../config/config';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';

export default function Edicao({navigation}){
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState(null);
  const [local, setLocal] = useState(null);
  const [code, setCode] = useState('none');
  const [displayQr,setDisplayQr] = useState('flex');
  const [displayForm,setDisplayForm] = useState('none');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }


    })();
  }, []);
  async function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    setDisplayQr('none');
    setDisplayForm('flex');
    setCode(data);
    await getLocation();
    await searchProduct(data);
    
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
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

  async function sendForm(){

  }

    return(

      <View style={[css.container,css.containerTop]}>
      <MenuAreaRestrita title='Edicão' navigation={navigation}/>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined :value=> handleBarCodeScanned(value)}
        style={[css.qr__code(displayQr)]}
      />
      <View style={[css.qr__form(displayForm)]}>
        <Text>Código do Produto: {code}</Text>
        <View style={[css.edicao__inputText]}>
        <TextInput
            placeholder='Nome do Produto'
            onChangeText={text=>setProduct(text)}
            value={product}
            />
        </View>
        <View style={[css.edicao__inputText]}>
        <TextInput
            placeholder='Localização do Produto'
            onChangeText={text=>setLocal(text)}
            value={local}
            />
        </View>
        <TouchableOpacity 
                    style={[css.login__button]}
                    onPress={()=>{sendForm()}}
                    >
                        <Text>Atualizar</Text>
                    </TouchableOpacity>
      </View>
 </View> 
            
    );
}