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
    import Modalsenha from 'react-native-modal';
    import Modalnivel from 'react-native-modal';
    import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita';
import Icon from 'react-native-vector-icons/FontAwesome';  

import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { set } from 'react-native-reanimated';


export default function EditarUsuario({route,navigation}){
    const {id} = route.params;

    const [nome,setNome]= useState("");
    const [nomeunidade,setNomeunidade] = useState("Escolha uma Unidade");
    const [idund,setIdund]=useState("");
    const [user,setUser]=useState("");
    const [nivel,setNivel] = useState(1);
    const [nomenivel,setNomenivel] = useState("Escolha o Nível");
    const [senha,setSenha]= useState("");
    const [repetir,setRepetir]= useState("");
    const [matricula,setMatricula]= useState("");
    const [visible,setVisible]= useState(false);
    const [visible1,setVisible1]= useState(false);
    const [visible2,setVisible2]= useState(false);
    const [loading,setLoading] = useState(false);
    const [confirmar,setConfirmar]=useState(false);

   const [data,setData] = useState([]);
   const [data1,setData1] = useState([]);
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
       getUnidades();
       buscarcadastro(id)
      
  },[]);
  useEffect(()=>{
    exibirMsg(true);
  },[repetir])

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
  }
  function confirmarSenha(){
      if(confirmar){

      }
  }
  async function buscarcadastro(idusuario){
    await api.post('/usuario/editar',{id:idusuario})
       .then(({ data }) => {
         setData(data);
         setNome(data[0].nome);
         setNomeunidade(data[0].razao);
         setNomenivel(data[0].nomenivel);
         setNivel(data[0].nivelId);
         setIdund(data[0].unidadeId);
         setMatricula(data[0].matricula);
        
       })
       .catch((error) => console.error(error))
       .finally(() => setLoading(false));
   }

  async function getUnidades(){
    await api.get('/listarUnidades',data)
        .then(response => { 
            setData1(response.data);
            
        })
        .catch(error => console.log("erro ao lista unidades: "+error))
    }
async function getSessao(){
    let response=await AsyncStorage.getItem('userData');
    let json=await JSON.parse(response);
    setUser(json.idusu);
    //setUnd(json.idund);
    
}
const buscar = async (chave)=>{
    const valor = await AsyncStorage.getItem(chave); 
    //let json=await JSON.parse(valor);
    
    return valor;
}
//enviar formulario 
function escolhanivel(nivel,nome){
    setNomenivel(nome);
    setNivel(nivel);
    setVisible2(false);
}

async function salvarForm(){
    getSessao();
   
    await api.put('/updateUsuario',dados)
        .then(response => { 
            setResponse(response.data);
            setVisible1(false);
        })
        .catch(error => console.log("erro ao salvar alteração do cadastro de usuário: "+error))
}

    return(

        <View style={[estilo.container]}>
        <MenuAreaRestrita title="Alterar Cadastro"/>
            <View style={[estilo.formCadastro]} >

                    <TextInput style={[estilo.textCadastro]}
                    placeholder='Nome Usuário'
                    onChangeText={text => setNome(text)}
                    value={nome}
                     />
                    <TextInput style={[estilo.textCadastro]}
                    placeholder='Matricula'
                    onChangeText={text => setMatricula(text)}
                    value={matricula}
                     />

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
                    onPress={()=>{setVisible2(true)}}
                
                        >
                          <View style={[estilo.containerUnidade]}> 
                          <Text style={[estilo.textContainerUnidade]}>{nomenivel}</Text>
                            <Icon name="angle-down" size={20} color="#000" />
                          </View>

                </TouchableOpacity>
                <Modalsenha
                    onBackButtonPress={()=>setVisible1(false)}
                   swipeDirection={['up','down','right']}
                    //swipeDirection={['right']}
                    transparent={true}
                    onSwipeComplete={()=>setVisible1(false)}
                    isVisible={visible1}>
                    <View style={[estilo.containerModalSenha]}>
                  
                    <View style={[estilo.headerModal]}>
                    <TouchableOpacity
                    onPress={()=>{setVisible1(false)}}
                    >
                    <Icon name="angle-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={[estilo.textHeader]}>Alterar Senha</Text>
                    <TouchableOpacity
                    onPress={()=>{setVisible1(false)}}
                    >
                    <Icon name="close" size={24} color="#ff0000" />
                    </TouchableOpacity>
                    </View>
                    <View style={[estilo.formSenha]}>
                    <TextInput style={[estilo.textCadastro]} 
                                placeholder="Senha:" 
                                onChangeText={text=>setSenha(text)} secureTextEntry={true} />
                    {exibirMsg()}
                    <TextInput style={[estilo.textCadastro]} 
                                placeholder="Repetir Senha:" 
                                onChangeText={text=>setRepetir(text)} secureTextEntry={true} />
                    <View style={[estilo.containerButtonBottom]}>
                    <TouchableOpacity
                    style={[estilo.buttonAlterarSenha]}
                                 onPress={()=>{setConfirmar(false),setVisible1(false)}}
                    >
                                <View style={{flexDirection:"row"}}>
                            
                                <Icon style={{marginRight:5}}name="check" size={20} color="#fff" />
                                    <Text style={{color:"#fff"}}>Cancelar</Text>
                                </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                            style={[estilo.buttonSave]}
                             onPress={()=>{setConfirmar(true),setVisible1(false)}}
                    >
                                <View style={{flexDirection:"row"}}>
                            
                                <Icon style={{marginRight:5}}name="check" size={20} color="#fff" />
                                    <Text style={{color:"#fff"}}>Confirmar</Text>
                                </View>
                    </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                </Modalsenha>
                <Modalnivel
                    //onBackButtonPress={()=>setVisible1(false)}
                   //swipeDirection={['up','down','right']}
                    //swipeDirection={['right']}
                    transparent={true}
                    //onSwipeComplete={()=>setVisible1(false)}
                    isVisible={visible2}>
                   
                    <View style={[estilo.containerModal]}>   
                    <View style={[estilo.headerModal]}>
                    <TouchableOpacity
                    onPress={()=>{setVisible2(false)}}
                    >
                    <Icon name="angle-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={[estilo.textHeader]}>Selecione o Nível de Permissão</Text>
                    <TouchableOpacity
                    onPress={()=>{setVisible2(false)}}
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
                <Modaldetalhes
                    onBackButtonPress={()=>setVisible(false)}
                   swipeDirection={['up','down','right']}
                    //swipeDirection={['right']}
                    transparent={true}
                    onSwipeComplete={()=>setVisible(false)}
                    isVisible={visible}>

                   
                    <View style={[estilo.containerModal]}>   
                    <View style={[estilo.headerModal]}>
                    <TouchableOpacity
                    onPress={()=>{setVisible(false)}}
                    >
                    <Icon name="angle-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={[estilo.textHeader]}>Escolher a Unidade</Text>
                    <TouchableOpacity
                    onPress={()=>{setVisible(false)}}
                    >
                    <Icon name="close" size={24} color="#ff0000" />
                    </TouchableOpacity>
                    
                    </View>
                        <FlatList
                                data={data1}
                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={({ item }) => (
                                    
                                      <View style={[estilo.card]}>
                                        <TouchableOpacity
                                        onPress={()=>{setNomeunidade(item.razao)}}
                                        onPress={()=>{setIdund(item.id)}}
                                        onPress={()=>{setVisible(false)}}
                                        >
                                            <View style={[estilo.interCard]}>
                                              <Text>{item.id+ " - "}</Text>                          
                                              <Text>{item.razao}</Text> 
                                              </View> 
                                       </TouchableOpacity>                        
                                      </View>  
                                    
         
                                        )}
                                    />  
                </View>
                </Modaldetalhes>

                <View style={[estilo.containerButtonBottom]}>
                            <TouchableOpacity
                                        style={[estilo.buttonAlterarSenha]}
                                        // onPress={()=>sendForm()}
                                        onPress={()=>{setVisible1(true)}}
                                        
                                        
                                        >
                                        <View style={{flexDirection:"row"}}>
                                        <Icon style={{marginRight:5}} name="key" size={20} color="#fff" />
                                            <Text style={{color:"#fff"}}>Alterar</Text>
                                            </View>
                        </TouchableOpacity>
                            <TouchableOpacity
                                        style={[estilo.buttonSave]}
                                        // onPress={()=>sendForm()}
                                        onPress={()=>{salvarForm()}}
                                        
                                        >
                                        <View style={{flexDirection:"row"}}>
                                        <Icon style={{marginRight:5}}name="check" size={20} color="#fff" />
                                            <Text style={{color:"#fff"}}>Salvar</Text>
                                            </View>
                        </TouchableOpacity>
                 </View>
         </View>
            

     
        </View> 
            
    ); 
}

const estilo = StyleSheet.create({
container:{
 
    height:"100%"
},

containerModalSenha:{
backgroundColor:"#dcdcdc",
width:"100%"
},
headerModal:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10,
    marginBottom:10,
    backgroundColor:"#fff",
 },
 containerbotoesbottom:{
    flexDirection:"row",
    justifyContent:"space-between"
 },
 containerButtonBottom:{
    flexDirection:"row",
    justifyContent:"space-between"
 },
containerModal:{
backgroundColor:"#dcdcdc",
height:"100%",
width:"100%"
},

headerModalSenha:{
    backgroundColor:"#fff",
},
formSenha:{
padding:20
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
buttonAlterarSenha:{
    elevation: 8,
    backgroundColor: "#1e90ff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:10,
    height:45,
    alignItems:"center",
    marginTop:20,
    width:"40%"
},
buttonSave:{
    elevation: 8,
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:10,
    height:45,
    alignItems:"center",
    marginTop:20,
    width:"40%"
},
textButton:{
    fontWeight:"bold",
    fontSize:16,
    color:"#fff",
    alignSelf:"center"
    
}

})