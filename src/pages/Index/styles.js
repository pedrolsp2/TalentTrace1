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
    }

})