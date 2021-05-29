import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import css from '../assets/css/Home';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home(props){
    return(
            <View style={css.home} >
                <View>
                   
                </View>
                <View style={css.home_botoes}>
                <TouchableOpacity
                    
                     onPress={()=>props.navigation.navigate('Login',{
                         id:30
                     })}
                 >
                      <Icon name="sign-in" size={50} color="#4b0082" />
                      <Text>Login</Text>
                 </TouchableOpacity>
              

                  
                    <TouchableOpacity
                     
                        onPress={()=>props.navigation.navigate('Rastreio',{
                            id:30
                        })}
                    >
                      <Icon name="cogs" size={50} color="#4b0082" />
                      <Text>Buscar</Text>
                    </TouchableOpacity>
                  

       </View>
                
            </View>
    ); 
}