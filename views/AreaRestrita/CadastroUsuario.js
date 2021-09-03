import React, { useState,useEffect } from 'react';
import { 
    View, 
    TextInput,
    Text,
    TouchableOpacity,
    Image,StyleSheet, 
    Button,SafeAreaView,FlatList
    } from 'react-native';
    import Modaldetalhes from 'react-native-modal';
    import Modalnivel from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Modalsenha from 'react-native-modal'; 
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';





export default function Cadastro({navigation}){

    const [nome,setNome]= useState("");
    const [nomeunidade,setNomeunidade] = useState("Escolha uma Unidade");
    const [idund,setIdund]=useState(1);
    const [user,setUser]=useState("");
    const [nivel,setNivel] = useState(1);
    const [nomenivel,setNomenivel] = useState("Escolha o Nível");
    const [senha,setSenha]= useState("");
    const [repetir,setRepetir]= useState("");
    const [matricula,setMatricula]= useState("");
    const [confirmar,setConfirmar]=useState(false);
    const [msg,setMsg]=useState("");
    const [visible,setVisible]= useState(false);
    const [visible1,setVisible1]= useState(false);
   const [data,setData] = useState([]);
   
   const [response,setResponse]=useState();
   const permissao = [
       {
           nome:"MESTRE",
           nivel:1
       },

       {
           nome:"ADMINISTRATIVO",
           nivel:2
       },

       {
           nome:"COMUM",
           nivel:3
       }
   ]
                const dados = {
                    nome,
                    idund,
                    senha,
                    matricula,
                    nivel
                }
                
  useEffect(()=>{
       getSessao()
       getUnidades()
      
  },[]);
  useEffect(()=>{
    exibirMsg();
  },[repetir])

function validarCampos(){
    if(validarSenha()){
        if(nome=="" || idund==0 || matricula==""|| nivel==0)  {
         return false;
        }else{
            return true;
        }     
    }else{
        return false;
    }
    return false;
}

function validarSenha(){
    if (senha.length==0 || repetir==0){
        return false;
    }else  if(repetir.length>0){

        if(repetir==senha){
          return true;
        }else{
          return false;
        }
    }
    return false;
}
  function exibirMsg(){
    if (senha.length==0 || repetir==0){
        return(<Text></Text>)
    }else  if(repetir.length>0){

        if(repetir==senha){
          return(<Text style={{color:"blue"}} >Senhas iguais!!!</Text>)
        }else{
          return(<Text style={{color:"red"}} > As senhas não são iguais!!!</Text>)
        }
    }
    return false
  }
  async function listarUsuarios(){
    await api.get('/usuarios')
       .then(({ data }) => {
         console.log("defaultApp -> data", data)
         setData(data);
         console.log(data);
        
       })
       .catch((error) => console.error(error))
       .finally(() => setLoading(false));
   }
   function escolhaunidade(id,nome){
       setNomeunidade(nome);
       setIdund(id);
       setVisible(false);
   }
   function escolhanivel(nivel,nome){
       setNomenivel(nome);
       setNivel(nivel);
       setVisible1(false);
   }
  async function getUnidades(){
    await api.get('/listarUnidades')
        .then(({data})=> { 
            console.log("defaultApp -> data", data)
            setData(data);
            
        })
        .catch(error => console.log("erro ao lista unidades: "+error))
    }

async function getSessao(){
    let response=await AsyncStorage.getItem('userData');
    let json=await JSON.parse(response);
    setUser(json.idusu);
  
    
}
const buscar = async (chave)=>{
    const valor = await AsyncStorage.getItem(chave); 
    //let json=await JSON.parse(valor);
    
    return valor;
}
//enviar formulario 


async function salvarForm(){
    getSessao();

   if(validarCampos()){
    {
        await api.post('/cadastrarUsuario',dados)
            .then(({data})=> {
                 
                setResponse(data);
                alert(data);
                navigation.navigate('ListUsuarios')
            })
            .catch(error => console.log("erro ao cadastrar usuário: "+error))
       }
      
   }else{
            alert("há campos não preenchidos!!!")
   }

}

    return(

        <View style={[estilo.container]}>
            <MenuAreaRestrita title="Cadastro de Usuário"/>
                <SafeAreaView style={[estilo.formCadastro]} >

                    <TextInput style={[estilo.textCadastro]}
                    placeholder='Nome Usuário'
                    onChangeText={text => setNome(text)}
                    value={nome}
                     />
                    <TextInput style={[estilo.textCadastro]}
                    placeholder='Matrícula'
                    onChangeText={text => setMatricula(text)}
                    value={matricula}
                     />
                 <TextInput style={[estilo.textCadastro]} 
                placeholder="Senha:" 
                onChangeText={text=>setSenha(text)} secureTextEntry={true} />
                 <TextInput style={[estilo.textCadastro]} 
                placeholder="Repetir Senha:" 
                onChangeText={text=>setRepetir(text)} secureTextEntry={true} />
               
                <TouchableOpacity 
                    style={[estilo.button_abrir]}
                    onPress={()=>{setVisible(true)}}
                        >
                          <View style={[estilo.containerUnidade]}> 
                          <Text style={[estilo.textContainerUnidade]}>{nomeunidade}</Text>
                            <Icon name="angle-down" size={20} color="#000" />
                          </View>

                </TouchableOpacity>
                <TouchableOpacity 
                    style={[estilo.button_abrir]}
                    onPress={()=>{setVisible1(true)}}
                        >
                          <View style={[estilo.containerUnidade]}> 
                          <Text style={[estilo.textContainerUnidade]}>{nomenivel}</Text>
                            <Icon name="angle-down" size={20} color="#000" />
                          </View>

                </TouchableOpacity>
                <Modaldetalhes
                           animationType="slide"
                           transparent={true}
                           isVisible={visible}
                   >

                   
                    <View style={[estilo.containerModal]}>   
                    <View style={[estilo.headerModal]}>
                    <TouchableOpacity
                    onPress={()=>{setVisible(false)}}
                    >
                    <Icon name="angle-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={[estilo.textHeader]}>Selecione a unidade</Text>
                    <TouchableOpacity
                    onPress={()=>{setVisible(false)}}
                    >
                    <Icon name="close" size={24} color="#ff0000" />
                    </TouchableOpacity>
                    </View>
                        <FlatList
                                data={data}
                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={({ item }) => (
                                    
                                      <View style={[estilo.card]}>
                                        <TouchableOpacity
                                        onPressIn={()=>{
                                            escolhaunidade(item.id,item.nomeunidade)
                                        }}
             
                                        >
                                            <View style={[estilo.interCard]}>
                                              <Text>{item.id+ " - "}</Text>                          
                                              <Text>{item.nomeunidade}</Text> 
                                              </View> 
                                       </TouchableOpacity>                        
                                      </View>  
                                    
         
                                        )}
                                    />  
                </View>
                </Modaldetalhes>
                <Modalnivel
                    //onBackButtonPress={()=>setVisible1(false)}
                   //swipeDirection={['up','down','right']}
                    //swipeDirection={['right']}
                    transparent={true}
                    //onSwipeComplete={()=>setVisible1(false)}
                    isVisible={visible1}>
                   
                    <View style={[estilo.containerModal]}>   
                    <View style={[estilo.headerModal]}>
                    <TouchableOpacity
                    onPress={()=>{setVisible1(false)}}
                    >
                    <Icon name="angle-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={[estilo.textHeader]}>Selecione o Nível de Permissão</Text>
                    <TouchableOpacity
                    onPress={()=>{setVisible1(false)}}
                    >
                    <Icon name="close" size={24} color="#ff0000" />
                    </TouchableOpacity>
                    </View>
                        <FlatList
                                data={permissao}
                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={({ item }) => (
                                    
                                      <View style={[estilo.card]}>
                                        <TouchableOpacity
                                        onPressIn={()=>{
                                            escolhanivel(item.nivel,item.nome)
                                        }}
             
                                        >
                                            <View style={[estilo.interCard]}>
                                              <Text>{item.nivel+ " - "}</Text>                          
                                              <Text>{item.nome}</Text> 
                                              </View> 
                                       </TouchableOpacity>                        
                                      </View>  
                                    
         
                                        )}
                                    />  
                </View>
                </Modalnivel>
                {exibirMsg()}
                 <TouchableOpacity 
                    style={[estilo.buttonSave]}
                    onPress={()=>{salvarForm()}}
                    >
                    <Text style={[estilo.textButton]}>Cadastrar</Text>
                    </TouchableOpacity>

                </SafeAreaView>
            

     
        </View> 
            
    ); 
}

const estilo = StyleSheet.create({
container:{
 
    height:"100%"
},

containerModal:{
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
   height:60,
   padding:10,
   marginBottom:10,
   backgroundColor:"#fff",
},
textHeader:{
 fontSize:14,
 color:"blue"
},
card:{
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
interCard:{
flexDirection:"row"
},
containerUnidade:{
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
textContainerUnidade:{
    fontSize:14,
    color:"#A9A9A9",
    backgroundColor:"#fff",
   
},
formCadastro:{
   width:"90%",
   marginLeft:10,
   marginTop:20
  
},
textCadastro:{
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
buttonSave:{
    elevation: 8,
    backgroundColor: "green",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:10,
    height:45,
    alignItems:"center",
    marginTop:20
},
textButton:{
    fontWeight:"bold",
    fontSize:16,
    color:"#fff",
    alignSelf:"center"
    
}

})