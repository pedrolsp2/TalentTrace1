import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export const primaryColor = '#1A0751';
export const style = StyleSheet.create({
    infoUser: {
        position: 'absolute',
        zIndex: 99,
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%'
    },
    idUser: {
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
        marginBottom: 4,
        textShadowColor: 'rgba(0,0,0, 0.90)',
        textShadowOffset: { width: -1, height: 1.5 },
        textShadowRadius: 8,
        width: 'auto',
    },
    infoVideo: {
        color: '#fff',
        marginRight: 54,
        textShadowColor: 'rgba(0,0,0, 0.90)',
        textShadowOffset: { width: -1, height: 1.5 },
        textShadowRadius: 8,
    },
    cover: {
        width: Platform.OS === 'android' ? 50 : 65, height: Platform.OS === 'android' ? 50 : 65,
        borderRadius: Platform.OS === 'android' ? 50 : 65,
        borderWidth: 2,
        borderColor: '#fafafa',
    }

})