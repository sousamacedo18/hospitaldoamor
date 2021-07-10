import React, { useState,useEffect } from 'react';
import { KeyboardAvoidingView,StyleSheet, Text, View, Button,BackHandler,Alert } from 'react-native';
import css from '../../assets/css/Css';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Profile from './Profile';
import Cadastro from './Cadastro';
import Edicao from './Edicao';

export default function AreaRestrita({Navigation}){

    const Tab = createMaterialBottomTabNavigator();

    return(
        <Tab.Navigator
          activeColor='#999'
          inactiveColor='#fff'
          barStyle={[css.area__tab]}
          >        
        <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
              title:"Perfil",
              tabBarIcon:()=>(
                <Icon name="users" size={20} color="#999" />
                
                
              )
            }}

           />
        <Tab.Screen 
        name="Cadastro" 
        component={Cadastro}
        options={{
          title:"Cadastro",
          tabBarIcon:()=>(
            <Icon name="archive" size={20} color="#999" />
            
          )
        }}        
         />
        <Tab.Screen 
        name="Edicao" 
        component={Edicao}
        options={{
          title:"Pesquisar",
          tabBarIcon:()=>(
            <Icon name="search" size={20} color="#999" />
            
          )
        }}         
         />
      </Tab.Navigator>
            
    ); 
}