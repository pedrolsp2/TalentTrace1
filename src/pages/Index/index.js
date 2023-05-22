import React, { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import firebase from "../../Configs/firebaseconfig.js"
import  {styles}  from './styles.js';

export default function Index() {
  const route = useRoute();
  const { dataUser } = route.params || {};

  const statusUser = () => {
    return !!dataUser;
  }

  const IndexHome = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const unsubscribe = firebase.firestore().collection('users').onSnapshot((snapshot) => {
        const data = snapshot.docs
          .map((doc) => {
            const docData = doc.data();
            const id = doc.id;
    
            if (docData.idUser === dataUser) {
              return { ...docData, id };
            } else {
              return null;
            }
          })
          .filter((item) => item !== null);
    
        if (data.length > 0) {
          setUserData(data[0]);
        }
      });

      return () => unsubscribe();
    }, [dataUser]);

    if (!userData) {
      return null;  
    }
    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <Image
          source={{
            uri: `https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          }} 
          style={{
            width: 100,
            height: 150,
            borderRadius: 10,
            marginHorizontal: 5,
            marginTop: 5,
          }}
        />
        <Text>Hi</Text>
          {/* <Text>Id ({userData.idUser})</Text>
          <Text>Nome ({userData.nome})</Text>
          <Text>Email ({userData.email})</Text>
          <Text>Cidade ({userData.cidade})</Text>
          <Text>Idade ({userData.idade})</Text>
          <Text>Altura ({userData.altura})</Text>
          <Text>Peso ({userData.peso})</Text>
          <Text>Perna ({userData.perna})</Text>
          <Text>Posicao ({userData.posicao})</Text>  */}
        </ScrollView>
      </SafeAreaView>
    )
  }

  const UserOff = () => {
    return (
      <SafeAreaView>
        <Text>Faça o login</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.coverContainer}>
          <Image
            source={{
              uri: `https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
            }} 
            style={styles.cover}
          />
          <Image
          source={{
            uri: `https://images.pexels.com/photos/2347870/pexels-photo-2347870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          }} 
          style={styles.profile}
          />
      </View>
      <Text>Hi</Text>
        {/* <Text>Id ({userData.idUser})</Text>
        <Text>Nome ({userData.nome})</Text>
        <Text>Email ({userData.email})</Text>
        <Text>Cidade ({userData.cidade})</Text>
        <Text>Idade ({userData.idade})</Text>
        <Text>Altura ({userData.altura})</Text>
        <Text>Peso ({userData.peso})</Text>
        <Text>Perna ({userData.perna})</Text>
        <Text>Posicao ({userData.posicao})</Text>  */}
      </ScrollView>
    </SafeAreaView>
  )
}
 
