import { StyleSheet } from "react-native";

const primaryColor = '#f0f0f0';
const secondaryColor = '#ea5051';
const tertiaryColor = '#a6c2d6';
const fourthColor = '#232e5c';
const buttonBorderRadius = 100;

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },   
    image: {
        flex: 1,
        justifyContent: "center",
        width: "100%", 
    },     
    prueba: {
        width: "100%",
        padding: 100,
        height:'100%',        

    },  
    buttonAccessCamera: {
        flexDirection: 'row',
    },  
    buttonCamera: {        
        marginRight: 20,
    }, 
    containerHome: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    textUser:{
        fontSize: 20,  
        color: '#fff',
        fontWeight: 'bold',  
        marginRight: 10,             
    },
    textHomeCamera:{
        backgroundColor: '#fff',
        width: '100%',
        padding: 10,
        borderRadius: 30,
        fontSize: 20,  
        color: '#3b4552',
        fontWeight: 'bold',                       
    },
    textCard:{
        fontSize: 15,  
        color: '#fff',   
        marginRight: 10,             
    },
    logo: {
        width: '100%',
        height: '30%',
    },
    logoLike: {
        width: 30, 
        height: 30,    
        marginLeft: 10, 
    },
    logoHome: {
        width: '100%',
        height: '70%',        
        margin: '3%',        
    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
    },
    input: {
        backgroundColor: primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: buttonBorderRadius,
        borderBottomColor: fourthColor,
        borderBottomWidth: 2,
        marginTop: '5%',
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
    buttonAccessContainer: {
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',  
        marginTop: '10%', 
    },
    buttonContainerHome: {
        width: '99%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: fourthColor,
        width: '100%',
        padding: 10,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',   
        marginTop: '5%',     
    },
    buttonHome: {
        backgroundColor: fourthColor,
        width: '100%',
        height: '45%',
        padding: 5,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',        
    },
    buttonHomeCamera: {
        backgroundColor: fourthColor,
        width: '100%',
        height: '30%',
        marginTop: 10,
        padding: 5,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',        
    },
    buttonRole: {
        backgroundColor: secondaryColor,
        width: '100%',
        padding: 5,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        marginTop: '5%',
    },
    buttonError: {
        backgroundColor: secondaryColor,
        width: '100%',
        padding: 15,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: primaryColor,
        marginTop: 5,
        borderColor: fourthColor,
        borderWidth: 2,
    },
    buttonOutlineRole: {
        backgroundColor: secondaryColor,
        marginTop: 5,
        borderColor: secondaryColor,
        borderWidth: 2,
    },
    buttonOutlineCamera: {
        backgroundColor: secondaryColor,        
        borderColor: secondaryColor,
        borderWidth: 2,
    },
    buttonText: {
        color: primaryColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: fourthColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineTextRole: {
        color: primaryColor,
        fontWeight: '700',
        fontSize: 16,
    },
    spinnerTextStyle: {
        color: 'white',
    },
    spinContainer: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 100,
    },
    textHome:{
        fontSize: 60,
        marginTop: 40, 
        color: secondaryColor,
        fontWeight: 'bold',        
    },
    textDescription:{
        fontSize: 20,
        marginTop: '10%', 
        color: secondaryColor,
        fontWeight: 'bold',  
        textAlign: 'center',
        margin: 5,
    }, 
    
})