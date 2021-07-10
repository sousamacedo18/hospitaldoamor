import React, { useState } from 'react';
import { Text, View ,TouchableOpacity, StyleSheet} from 'react-native';
import css from "../css/Css";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function MenuPrincipal(props){
    async function logout(){
        await AsyncStorage.clear();
        props.navigation.navigate('Login');
}

    return(

        <View style={[estilo.area__menu]}>
            <View style={[estilo.button__home2]}>

            </View>
            <TouchableOpacity style={[estilo.button__home2]} onPress={()=>props.navigation.navigate('AreaRestrita')}>
            <Icon name="home" size={20} color="#191970" />
            </TouchableOpacity>
            <Text style={[estilo.area__title]}>{props.title}</Text>
            <TouchableOpacity style={[estilo.button__logout]} onPress={()=>logout()}>
            <Icon name="sign-out" size={20} color="#191970" />
            </TouchableOpacity>           
        </View> 
            
    ); 
}
const estilo = StyleSheet.create({
    area__menu:{
        flexDirection:'row',
        paddingTop:40,
        paddingBottom:10,
        width:'100%',
        backgroundColor:'#add8e6',
        alignItems:'center',
        justifyContent:'center'

},
button__home2:{
        textAlign:'left'
},
area__title:{
            width:'80%',
            fontWeight:'bold',
            fontSize:20,
            color:'#191970',
            textAlign:'center'
},
button__logout:{
        textAlign:'right'   
},
  });