import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, SafeAreaView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { primaryColor, secundaryColor, TerColor, styles } from '../styles.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Picture() { 
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'A permissão para acessar a galeria é necessária.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

    return(
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.info}>
          <TouchableOpacity onPress={()=>navigation.navigate('DiscritionUser')}> 
            <Ionicons
              name='chevron-back-outline'
              size={52}
              color={TerColor}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Para finalizar</Text>
          <Text style={styles.Text}>Escolha um foto bonita para seu perfil</Text>
        </View>
        <View style={styles.containerPicture}>
       {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imageSelect} />}
        <Button title="Escolher foto" onPress={openImagePickerAsync} />
        </View>
          <TouchableOpacity style={styles.Button} onPress={''}> 
             <Text style={styles.TextButton}>Avançar</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.ButtonSkills} onPress={mostra}> 
             <Text style={styles.TextButton}>Mostrar</Text>
          </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  ); 
}

