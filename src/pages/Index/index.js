import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Index({ dataUser }) {
    const route = useRoute();

    const statusUser = () =>{
        if(!route.params?.dataUser){
            return false;
        }
        return true;
    }

    const IndexHome = ()=> {
        return(
        <Text>Bem-vindo</Text>
        )
    }

    const UserOff = ()=> {
        return(
        <Text>Faça o login</Text>
        )
    }

    return (
        <SafeAreaView>
                {
                    statusUser() ? <IndexHome /> : <UserOff />
                }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

