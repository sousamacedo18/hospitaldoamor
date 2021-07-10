import {StyleSheet} from "react-native";

const logincss = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
       
    },
    container2:{
        flex:1,
        flexDirection:'row',
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center"
    },
    darkbg:{
        backgroundColor:"#dcdcdc"
    },
    login__msg:{
        fontWeight:"bold",
        fontSize:22,
        color:"red",
        marginTop:10,
        marginBottom:15,
        alignItems:"center"
    },

    login__form:{
        width: "80%"
    },
    login__input:{
        backgroundColor:"#fff",
        fontSize:19,
        padding:7,
        marginBottom:15,
        borderRadius:5
    },
    login__button:{
        padding:12,
        backgroundColor:"#1e90ff",
        alignSelf:"center",
        
        borderRadius:5,
        width:"100%"
        
    },
    login__buttonCadastro:{
        padding:12,
        backgroundColor:"#f08080",
        alignSelf:"center",
        marginTop:50,
        borderRadius:5,
        width:"100%"
        
    },
    login__buttonText:{
        fontWeight:"bold",
        fontSize:22,
        color:"#fff5ee",
        alignSelf:"center"
    },
    login__buttonTextCadastro:{
        fontWeight:"bold",
        fontSize:22,
        color:"#fff5ee",
        alignSelf:"center"
    },
    login__textLogo1:{
        fontWeight:"bold",
        fontSize:16,
        color:"#4b0082",
        fontStyle:"italic"

    },

});

export default logincss;