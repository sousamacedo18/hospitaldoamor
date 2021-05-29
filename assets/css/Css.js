import {StyleSheet} from "react-native";

const Css = StyleSheet.create({
    area__tab:{
            backgroundColor:'#333',
            fontSize:20,
            fontWeight:'bold',
            color:'#333'
        },
    home:{
        paddingTop:15,
        flex:1,
        
        backgroundColor:"#fff",
     

       
    },
    container:{
             
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
       
    },
    containerTop:{

      
       
    },
    container2:{
        
        
        backgroundColor:"#fff",
        alignItems:"center",
       
    },
    containerProfile:{

        backgroundColor:"#fff",
        padding:10
    },
    darkbg:{
        backgroundColor:"#333"
    },
    login__msg:{
        fontWeight:"bold",
        fontSize:22,
        color:"red",
        marginTop:10,
        marginBottom:15
    },
    login__inputText:{
        fontWeight:"bold",
        fontSize:22,
        color:"#333"
    },
    cadastro__inputText:{
        fontWeight:"bold",
        fontSize:18,
        color:"#333",
        borderWidth: 1,
        borderColor: "#f0f2f5",
        borderRadius: 3,
    },
    edicao__inputText:{
        
            margin: 15,
            height: 40,
            borderColor: '#7a42f4',
            borderWidth: 1
         },
    
    login__form:{
        width: "80%"
    },
    login__input:{
        backgroundColor:"#333",
        fontSize:19,
        padding:7,
        marginBottom:15
    },
    login__button:{
        padding:12,
        backgroundColor:"#F58634",
        alignSelf:"center",
        borderRadius:5
    
    },
    login__buttonText:{
        fontWeight:"bold",
        fontSize:22,
        color:"#333"
    },
    login__msgText:{
        fontWeight:"bold",
        fontSize:32,
        backgroundColor:"white",
        color:"#FF0000",
        alignSelf:"center"
    },
    area__menu:{
            flexDirection:'row',
            paddingTop:40,
            paddingBottom:10,
            width:'100%',
            backgroundColor:'#111',
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
                color:'#fff',
                textAlign:'center'
    },
    button__logout:{
            textAlign:'right'   
    },
    profile__inputText:{
        fontWeight:"bold",
        fontSize:12,
        color:"#333",
        //backgroundColor:'#333',
        borderRadius:5,
        marginTop:5,
        padding:5,
        borderWidth: 1,
        borderColor: "#20232a",
        borderRadius: 6,
    },
    cadastro__inputText:{
        //fontWeight:"bold",
        fontSize:14,
        color:"#333",
        //backgroundColor:'#333',
        borderRadius:5,
        margin:5,
        padding:5,
        borderWidth: 0.5,
        borderColor: "#20232a",
      
    },
    profile__button:{
        padding:12,
        backgroundColor:"#F58634",
        //alignSelf:"center",
        borderRadius:5,
        marginTop:5
    },
    cadastro__button:{
        padding:12,
        backgroundColor:"#F58634",
        alignSelf:"center",
        marginLeft:10,
        marginRight:10,
        borderRadius:5,
        marginTop:5,
       
    },
    profile__buttonText:{
        fontWeight:"bold",
        fontSize:18,
        color:"#fff",
        textAlign:"center",
    },
    profile__Text:{
        color: "#20232a",
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold"  
    },

      tinyLogo: {
        width: 80,
        height: 80,
        borderRadius:50,
      },
      logo: {
        width: 66,
        height: 58,
      },
      profile__avatar:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-around"   
        
      },
      profile__formRec:{
          marginTop:20,
      },
      qr__code:(display='flex')=>({
            width:'100%',
            height:'100%',
            background:'#000',
            justifyContent:'center',
            display: display
      }),
      qr__form:(display='none')=>({
                width:'100%',
                display:display
      })

});

export default Css;