import React, { useState,useEffect } from 'react';
import { 
    View, 
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet, 
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';  
import Feather from 'react-native-vector-icons/Feather'; 
import MenuAreaRestrita from '../../assets/Components/MenuAreaRestrita'; 
import Modalescolha from 'react-native-modal';
import Modaldetalhes from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import Moment from 'moment';



export default function DetailProduto({ route, navigation }){
    const {id,idFluxo,nomeFluxo} = route.params;

    //const produto = route.params.data;
    const [codigo,setCodigo]=useState();
    const [idtipo,setIdtipo]=useState();
    const [nome,setNome]=useState();
    const [matricula,setMatricula]=useState();
    const [iduser,setIdUser]=useState(0);
    const [idu,setIdU]=useState(0);
    const [idund,setIdund]=useState(0);
    const [idun,setIdun]=useState(0);
    const [idpcli,setIdCli]=useState();
    const [idfluxo,setIdfluxo]=useState();
    const [nomeund,setNomeund]=useState();
    const [nometipo,setNometipo]=useState();
    const [nomefluxo,setNomefluxo]=useState("Selecione a Etapa");
    const [descricao,setDescricao]=useState();
    const [desc,setDesc]=useState();
    const [obs,setObs]=useState('');
    const [data,setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [loading,setLoading] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [counter, setCounter] = useState(0);
    const [estado,setEstado] = useState('Selecione o Estado');
    const [idestado,setIdestado] = useState(0);
    const [visualizar,setvisualizar] = useState(true);
    const [visualizarForm,setvisualizarForm] = useState(true);
    const [visible,setVisible] = useState(false);
    const [visible1,setVisible1] = useState(false);


    const dados = {
        codigo,
        obs,
        idpcli,
        idfluxo,
        idestado,
        idun,
        idu,
        idtipo,
        idfluxo
    }


  function formatarData(d){
    Moment.locale('pt');
    //var dt = '2016-05-02T00:00:00';
    return Moment(d).format('DD/MM/YYYY')

  }
  function formatarHora(h){
    Moment.locale('pt');
    //var dt = '2016-05-02T00:00:00';
    return Moment(h).format('LT')

  }
  function mudar(){
      if(counter<5){
        setCounter(counter+1);
          if(counter==1){
              setEstado('INICIAR');
          }
          if(counter==2){
              setEstado('PAUSAR');
          }
          if(counter==3){
              setEstado('REINICIAR');
          }
          
          if(counter==4){
              setEstado('PARAR');
          }
          if(counter==5){
              setEstado('FINALIZAR');
          }
            
  }else{
    setCounter(0);
   
  }
}
async function listartimeline(cod,flux){
let idest= 0;

        await  api.post(`/timeline/lastrecord`,{code:cod,fluxo:flux})
          .then(({ data }) => {
              setData3(data.results);
              if(data.length>0){
                idest=data.results[0].idestado;
              }
              
           
          })
          .catch((error) => console.error(error))
          .finally(() => {montarestado(idest)});
        } 
async function listartimelinetudo(){


        await  api.post(`/timeline/allrecord`,{code:id,fluxo:idFluxo})
          .then(({ data }) => {
              setData(data.results);
           
          })
          .catch((error) => console.error(error))
          .finally(() => {});
        } 

  
async function escolherfluxo(){
 
 await   api.post('/fluxo',{
       id:idtipo
     })
     
       .then(({ data }) => {
         //console.log("dados do fluxo-> data", data)
         setData2(data)
       })
       .catch((error) => console.error("erro ao montar fluxo: "+error))
       .finally(() => setLoading(false));
}
function montarestado(atual){
  let ids=0;
      if(atual==0){
         ids="0"
      }
      if(atual==1){
         ids="1,4"
      }
      if(atual==2||atual==3){
         ids="1,2,3"
      }
      if(atual==4){
         ids="1,4"
      }
      if(atual==5){
         ids="1,2,3,5,6"
      }
      if(atual==6){
         ids="1,2,3,6"
      }
      escolhaestado(ids);
  
      console.log(ids);
}

async function escolhaestado(ids){
  await  api.post('/estado/not',{not_id:ids})
    .then(({ data }) => {
      //console.log("Estado -> data", data.resultado)
      setData1(data.resultado);
     
     
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}
function abrirModalDetalhes(){
      setVisible(true);
      listartimelinetudo();

}
async function buscarproduto(codigo){
    await api.get(`/produtos/cod/${codigo}`)
    .then(({ data }) => {
      setIdtipo(data[0].idtipo);
      setIdCli(data[0].idpcli);
      setCodigo(data[0].codigo);
      setDescricao(data[0].descricao);
      setNome(data[0].nometipo);
      setMatricula(data[0].matricula);

    })
    .catch((error) => console.error("erro ao buscar produto: "+error))
    .finally(() =>{listartimeline(codigo,idFluxo);});
}

    useEffect(() =>{
                  buscarproduto(id);
                  buscardadossessao();
                  setIdfluxo(idFluxo);
      },[]);
      


    async function buscardadossessao(){
        try {
            const myArray = await AsyncStorage.getItem('userData');
            if (myArray !== null) {
              // We have data!!
              const json=JSON.parse(myArray);
                    setIdU(json.idusu);
                    setIdun(json.idund);
         
                                         

            }
          } catch (error) {
            // Error retrieving data
          }    
    }
     async function escolherFluxo(id,nome){
        setNomefluxo(nome);
        setIdfluxo(id);
        setVisible(false); 
  
    }
    async function escolherEstado(id,tipo){
        setEstado(tipo);
        setIdestado(id);
        setVisible1(false);
        setvisualizar(false);
        if(id==1 || id==4 || id==5){
          setvisualizarForm(false); 
        }else{
          setvisualizarForm(true);
        }

  
    }
    function formClose(){
         setIdestado(0)
         setEstado("Selecione o Estado");
         setvisualizar(true);
         setvisualizarForm(false);
    }
    async function salvarForm(){
     
      
        //console.log("dados para salvar ->",dados);
        await api.post('/produto/cadtime',dados)
        .then(response => { 
          
           //return response; 
        })
        .catch(error => console.log(error))
        .finally(() =>{{setvisualizarForm(false)}{setvisualizar(true)}});


    }
    return(
        <View style={[estilo.conteiner]}> 
         <MenuAreaRestrita title="Alterar Estado"/>
       <View style={[estilo.containerCentral]}>
        <View style={[estilo.cardproduto]}>
            <Text>Descrição: {descricao}</Text>
            <Text>Tipo: {nome}</Text>
            <Text>ID paciente: {idpcli}</Text>
            <Text>QRCode:<Text style={[estilo.textColor]}> {codigo}</Text></Text>
            <Text>Matrícula:{matricula}</Text>
            <Text>ID Fluxo:{idFluxo} nome do fluxo: {nomeFluxo}</Text>
        </View>
       
        <View style={[estilo.conteinerButton]}>
        <>

                <Text>Escolha o Estado</Text>
        <View style={[estilo.conteinerEscolha]}>
                  
                  
                  <TouchableOpacity 
                    style={[estilo.button_abrir]}
                    onPress={()=>{setVisible1(true)}}
                        >
                          <View style={[estilo.conteinerEstado]}> 
                          <Text style={[estilo.inputText1]}>{estado}</Text>
                            <Icon name="angle-down" size={20} color="#f08080" />
                          </View>

                        </TouchableOpacity>
                <Modalescolha
                    onBackButtonPress={()=>setVisible1(false)}
                    //swipeDirection={['right']}
                     swipeDirection={['up','down','right']}
                    onSwipeComplete={()=>setVisible1(false)}
                    isVisible={visible1}>
                        <View style={[estilo.containerModal]}>
                        <View style={[estilo.headerModal]}>
                                <TouchableOpacity
                                onPress={()=>{setVisible1(false)}}
                                >
                                <Icon name="angle-left" size={24} color="#000" />
                                </TouchableOpacity>
                                <Text style={[estilo.textHeader]}>Selecione uma das opções</Text>
                                <TouchableOpacity
                                onPress={()=>{setVisible1(false)}}
                                >
                                <Icon name="close" size={24} color="#ff0000" />
                                </TouchableOpacity>
                                </View> 
                            <View style={[estilo.bodyModal]}>
                        <FlatList
                                data={data1}
                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={({ item }) => (
                              
                                <TouchableOpacity 
                                onPress={()=>{escolherEstado(item.id,item.nomeestado)}}
                                style={[estilo.button_escolha]}>
                             <Text style={[]}>{item.nomeestado}</Text>
                                <Feather
                                  raised
                                  name='arrow-right'
                                  type='Feather'
                                  color='#f08080'
                                  size={18} />
                              </TouchableOpacity>
                              
                                )}
                            />
                        </View>
                        </View>
                </Modalescolha>
                <Modaldetalhes
                    onBackButtonPress={()=>setVisible(false)}
                   // swipeDirection={['up','down','right']}
                    swipeDirection={['right']}
                    onSwipeComplete={()=>setVisible(false)}
                    isVisible={visible}>
                        <View style={{backgroundColor:'silver', height:'auto', padding:10}}>
                            
                        <SafeAreaView>

                        <FlatList
                                data={data}
                                keyExtractor = { (item, index) => index.toString() }
                   
                                renderItem={({ item }) => (
                                    <View style={[estilo.subcard]}>
                                      <View style={[estilo.conteinerQrcode]}>
                                      <Icon name="qrcode" size={16} color="#6495ed" />
                                      <Text style={[estilo.textColor]}>{item.idtqrcode}</Text>
                                      </View>

                                      <View style={[estilo.cadInferior]}>
                                              {/* <Text>{item.idestado}</Text> */}
                                              
                                              <Text>
                                                  <Feather name="move" size={16} color="#6495ed" />
                                                  {item.nomeestadoatual}
                                                </Text>
                                              <Text>
                                                 <Feather name="calendar" size={16} color="#6495ed" />
                                                  {formatarData(item.created_at)}
                                                </Text>
                                              <Text>
                                              <Feather name="clock" size={16} color="#6495ed" />
                                                {formatarHora(item.created_at)}
                                                </Text>
                                      </View>
                                      <View style={[]}>
                                                  {/* <Text>{item.id}</Text> */}
                                                  <Text>Observação:</Text>
                                                  <Text style={[estilo.textObs]}>
                                                  
                                                    {item.observacao}
                                                    </Text>
                                      </View>
      
 

                                    </View>
         
                                )}
     />
      </SafeAreaView>
                        </View>
                </Modaldetalhes>
                </View>
                
        </>
        {idestado>0&&(
                <View style={[estilo.containerDescricaoPrincipal]} >
                  <View style={[estilo.containerClose]}>
                          <TouchableOpacity
                                onPress={()=>{formClose()}}
                                >  
                                <Feather name="x" size={20} color="#ff0000" />
                                </TouchableOpacity>
                  </View>
                     {visualizarForm &&(
                         <>
                         <View style={[estilo.containerDescricao]}>
                            <Text>Descreva o motivo deste estado</Text>
 
                         </View>
                    <TextInput
                            onChangeText={text => setObs(text)}
                            value = {obs}
                            placeholder={'Digite o motivo aqui...'}
                            multiline={true}
                            numberOfLines={4}
                            style={[estilo.inputText]}>
                           
                    </TextInput>
                    </>
                     )}
                  
               
               


                        <TouchableOpacity 
                                style={[estilo.cadastro__button]}
                                onPress={()=>{salvarForm()}}
                                            >
                                <Text style={[estilo.cadastro__buttonText]}>Salvar</Text>
                        </TouchableOpacity> 
               
                       
                       
          
                </View>
        )}

        </View>
        {visualizar==true &&(
        <View style={[estilo.containerDetalhes]}>

          <Text>Detalhes do Processo</Text>
          <TouchableOpacity
          onPress={()=>{abrirModalDetalhes()}}
          >
               <Feather name="maximize-2" size={22} color="#6495ed" />
          </TouchableOpacity>
        
          
          </View>
        )}
         {visualizar==true &&( 

      
        <View>

        <FlatList
                                data={data3}
                                keyExtractor = { (item, index) => index.toString() }
                                renderItem={({ item }) => (
                                    <View style={[estilo.subcard]}>
                                      <View style={[estilo.conteinerQrcode]}>
                                      <Icon name="qrcode" size={16} color="#6495ed" />
                                      <Text style={[estilo.textColor]}>{item.idtqrcode}</Text>
                                      </View>

                                      <View style={[estilo.cadInferior]}>
                                              {/* <Text>{item.idestado}</Text> */}
                                              
                                              <Text>
                                                  <Feather name="move" size={16} color="#6495ed" />
                                                  {item.nomeestadoatual}
                                                </Text>
                                              <Text>
                                                 <Feather name="calendar" size={16} color="#6495ed" />
                                                  {formatarData(item.created_at)}
                                                </Text>
                                              <Text>
                                              <Feather name="clock" size={16} color="#6495ed" />
                                                {formatarHora(item.created_at)}
                                                </Text>
                                      </View>
                                      <View style={[]}>
                                                  {/* <Text>{item.id}</Text> */}
                                                  <Text>Observação:</Text>
                                                  <Text style={[estilo.textObs]}>
                                                  
                                                    {item.observacao}
                                                    </Text>
                                      </View>
      
                                    </View>
         
                                )}
     />
        </View> 
      )}
      </View>
            </View>
    )
}
const estilo = StyleSheet.create({
    conteiner:{
      height:"100%",
      width:"100%",

    },
    containerCentral:{
        padding:10,
    },
    textColor:{
        color:'#d2691e',
        marginLeft:10,
        
    },
  conteinerEstado:{
      flexDirection:"row"
  },
  containerClose:{
         alignItems:"flex-end"
  },
  headerModal:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10,
    marginBottom:10,
    backgroundColor:"#fff",
 },
 containerModal:{
    backgroundColor:"#dcdcdc",
    height:"100%"
 },
 textHeader:{
  fontSize:14,
  color:"blue"
 },
 bodyModal:{
  backgroundColor:"#dcdcdc",
  padding:10
 },
    cardproduto:{
      width:"100%",
      alignSelf:"center",
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
     containerDescricaoPrincipal:{
          borderWidth:1,
          borderColor:"silver",
          borderRadius:5,
          padding:5,
          marginTop:5
     },
    cadastro__button:{
        padding:12,
      
        alignSelf:"center",
        marginLeft:10,
        marginRight:10,
        borderRadius:5,
        marginTop:10,
        width:"100%",
        backgroundColor:"#228b22",
       
    },
    textObs:{
        textAlign:"justify",
        fontStyle:"italic",
        padding:10,
        
    },
    conteinerButton:{
        width:'98%',
        alignSelf:"center",
        marginTop:10,
        marginBottom:10,
        borderWidth:1,
        padding:10,
        borderRadius:5,
        borderColor:"#c0c0c0",
        backgroundColor:"#fff"
    
    },
    containerDescricao:{
         
          flexDirection:"row",
          justifyContent:"space-between"
    },
    containerDetalhes:{
 
          flexDirection:"row",
          justifyContent:"space-between",
          paddingRight:10,
          marginBottom:5
    },
    conteinerQrcode:{
     flexDirection:"row",
     alignItems:"center"
    },
    cadastro__buttonText:{
        textAlign:'center',
        fontWeight:"bold",
        fontSize:16,
        color:"#fff",
        
    },
    conteinerEscolha:{
  
        padding:10,
        width:"97%",
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
    inputText:{
        fontSize:14,
        color:"#708090",
        backgroundColor:"#fff",
        borderWidth:1,
        borderColor:"silver",
        marginLeft:8,
        marginRight:8,
        padding:10,
        marginTop:20
    },
    inputText1:{
        fontSize:14,
        color:"black",
        width:"90%",

     
    },
    button_escolha:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderRadius:10,
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
      subcard:{
        borderWidth:1,
        borderColor:"#c0c0c0",
        marginBottom:5,
        padding:5,
        justifyContent:"space-between",
        backgroundColor:"#fff",
      },
      cadInferior:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10,
        borderBottomWidth:1,
        borderColor:"#dc143c",
        paddingBottom:10
      }

});