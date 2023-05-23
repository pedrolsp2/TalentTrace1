import React, { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView } from 'react-native';
import {  Ionicons } from '@expo/vector-icons';
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
      <View style={styles.containerContnet}>
            <Text style={styles.Nome}>
            {userData.nome}
            </Text>

          <View style={styles.containerInfoPlayer}>
            <Text style={styles.label}>
              Perfil do jogador
            </Text>
            <View style={styles.icons}>
              <View style={styles.iconsRow}>
                <Text style={styles.icon}>
                <Ionicons
                  name='pin-outline'
                  size={32}
                  color="#1C3F7C" 
                />
                 {userData.cidade}</Text>
                <Text style={styles.icon}>@ {userData.altura}</Text>
                <Text style={styles.icon}>@ {userData.posicao}</Text>
              </View>
              <View style={styles.iconsRow}>
                <Text style={styles.icon}>@ {userData.idade} anos</Text>
                <Text style={styles.icon}>@ {userData.peso}kg</Text>
                <Text style={styles.icon}>@ {userData.perna}</Text>
                </View>
            </View>
            <Text style={styles.label}>
              Por onde passei
            </Text>
            <Text style={styles.textP}>
            {userData.passou}
            </Text>
            <Text style={styles.label}>
              Sobre mim
            </Text>
            <Text style={styles.textP}>
            {userData.sobre}
            </Text>
          </View>
      </View> 
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
        <IndexHome />
  )
}
 
