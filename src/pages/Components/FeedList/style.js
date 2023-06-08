import { StyleSheet } from "react-native";
import { Platform } from "react-native";

 export const primaryColor = '#1A0751';
   export const style = StyleSheet.create({
    infoUser:{
        position: 'absolute',
        zIndex: 99,
        left: 8,
        padding: 8
    },
    idUser:{
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
        marginBottom: 4,
        textShadowColor: 'rgba(0,0,0, 0.90)',
        textShadowOffset: {width: -1, height: 1.5},
        textShadowRadius: 8,
    },
    infoVideo:{
        color: '#fff',
        marginRight: 24,
        textShadowColor: 'rgba(0,0,0, 0.90)',
        textShadowOffset: {width: -1, height: 1.5},
        textShadowRadius: 8,
    },
    actions:{
        position: 'absolute',
        zIndex: 99,
        right: 10,
        bottom: Platform.OS === 'android' ? 220 : 270,
        gap: 12,
        alignItems: 'center'
    },

   })