import React, { useState } from 'react';
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native';
import css from "../css/Css";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import{useNavigation,useRoute} from '@react-navigation/native';

export default function MenuAreaRestrita(props){
    const route = useRoute();
  
   const navigation = useNavigation();

     function voltarControle(){
       //navigation.goBack('controle');
      navigation.navigate('Controle');
}

    async function retornar(){
        await AsyncStorage.clear;
       //navigation.goBack('controle');
       navigation.goBack()
    
}

    return(

        <View style={[estilo.area__menu]}>
                    <TouchableOpacity onPress={()=>retornar()}>
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>   
                                    <Text style={[estilo.title]}>{props.title}</Text>
                    <TouchableOpacity  onPress={()=>{voltarControle()}}>
                        <FontAwesome name="home" size={24} color="white" />
                    </TouchableOpacity>
     
        
        </View> 
            
    ); 
}

const estilo = StyleSheet.create({
    area__menu:{
        flexDirection:'row',
        marginTop:0,
        paddingBottom:20,
        paddingLeft:15,
        paddingRight:15,
        height:100,
        backgroundColor:'#91d1f5',
        alignItems:'flex-end',
        justifyContent:'space-between'
},
title:{
    
    fontWeight:'bold',
    fontSize:20,
    color:'#fff',
    textAlign:'center'
}
});