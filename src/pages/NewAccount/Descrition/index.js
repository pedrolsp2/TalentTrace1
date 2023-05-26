import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { primaryColor, secundaryColor, TerColor, styles } from '../styles.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../Configs/firebase-config';   
import firebase from "../../../Configs/firebaseconfig.js"


export default function Descrition() {
  const [newData, setNewData] = useState(null);
  const [about, setAbout] = useState('');
  const [bio, setBio] = useState('');  
  const navigation = useNavigation(); 
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@talenttrace:dataUsers');
        setNewData(JSON.parse(userData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleAddDiscrition = async () => {
    const updatedData = { ...newData,
       passou: about,
       sobre: bio,
      };
    try {
      await AsyncStorage.setItem('@talenttrace:dataUsers', JSON.stringify(updatedData));
    } catch (error) {
      console.log(error);
    }   
  }; 
  
  let users = [];
  async function convertData() {
    try {
      const data = await AsyncStorage.getItem('@talenttrace:dataUsers');
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          users = parsedData; 
        } catch (parseError) {
          console.log('Error parsing data:', parseError);
        }
      } else {
        console.log('No data found in AsyncStorage');
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }  
  }  

  convertData()

  const handleCreateAccount = () =>{
    createUserWithEmailAndPassword(auth,users.email, users.senha)
    .then((userCredential) => {
      console.log('user new');
      const userOn = userCredential.user;
      console.log(userOn.uid.toString());
      handleNewUser(userOn.uid)
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') { 
       Alert.alert("Email já esta sendo usado")
       navigation.navigate("NameUser")
      } else if (error.code === 'auth/invalid-email') { 
        Alert.alert("Email invalido")
        navigation.navigate("NameUser")
      } else if (error.code === 'auth/invalid-password') {
        Alert.alert("Senha invalidade")
        navigation.navigate("NameUser")
      } 
    });
}

const handleNewUser = async (id) =>{
  const userNew = await firebase.firestore().collection("users").add({
    idUser: id,
    altura: users.altura ,
    cidade: users.cidade ,
    email: users.email ,
    nome: users.nome ,
    passou: "Joguei dois anos pelo Fortaleza, sou de São Paula então joguei 3 anos no america de Rio Preto" ,
    perna: users.perna ,
    peso: users.peso ,
    posicao: users.posicao ,
    senha: users.senha ,
    sobre: "Sou uma jovem promesa" ,
  })
Alert.alert("Sucesso!")
}


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.info}>
          <TouchableOpacity onPress={()=>navigation.navigate('SkillsUser')}> 
            <Ionicons
              name='chevron-back-outline'
              size={52}
              color={TerColor}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Diga um pouco mais sobre você!</Text>
          <Text style={styles.Text}>Está quase acabando....</Text>
          <View style={styles.containerInput}>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <TextInput
                  style={styles.textInput}
                  placeholder='Diga por onde você passou? Caso não há experiencias, sem problemas!'
                  value={bio}
                  onChangeText={setBio}
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <TextInput
                  style={styles.textInput}
                  placeholder='Fale sobre você!'
                  value={about}
                  onChangeText={setAbout}
                />
              </View>
            </View>
          </View>
        </View>
          <TouchableOpacity style={styles.Button} onPress={handleAddDiscrition}> 
             <Text style={styles.TextButton}>Avançar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ButtonSkills} onPress={handleCreateAccount}> 
             <Text style={styles.TextButton}>Mostrar</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
