import { StyleSheet } from "react-native";

export const primaryColor = '#1A0751';
export const TerColor = '#290398';
export const secundaryColor = '#14AF6C';

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'space-between', 
    }, 
    coverContainer:{
        position: 'relative'
    },
    cover:{
        width: "100%",
        height: 200, 
        borderBottomRightRadius: 46,
        borderBottomLeftRadius: 46,
    },
    profile:{
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fafafa',
        position: 'absolute',
        bottom: 8,
        left: 8
    },
    containerContnet:{
        padding: 12,
        paddingTop: 12
    },
    Nome:{
        color: primaryColor,
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
    },
    containerInfoPlayer:{
        paddingTop: 12,
        paddingStart: 8,
        fontSize: 12,
        color: '#3A3A3A',
        fontFamily: 'Poppins_700Bold',
    },
    icons:{
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
        flexDirection: 'column',
        padding: 4
    },
    iconsRow:{
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
        padding: 4,
        gap: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    icon:{
        borderWidth: 1,
        borderColor: 'blue',
        width: '33%',   
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label:{
        paddingTop: 12
    }

})