import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, SafeAreaView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { primaryColor, secundaryColor, TerColor, styles } from '../styles.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../../Configs/firebasestorageconfig.js'

export default function Picture() { 
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect: [4,3],
      quality: 1
    });

    const source = {uri: result.uri}
    setImage(source)
  }

  const uploadImage = async ()=>{
    setUploading(true);
    const response = await fetch(image.uri)
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
    var ref = firebase.storage().ref().child(filename).put(blob)
    console.log(filename)

    try{
        await ref;
    }catch(e){
        console.log(e)
    }
    setUploading(false)
    Alert.alert("Sucesso!!")
    setImage(null)
  }

    return(
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Text>Selecione</Text>
        </TouchableOpacity>
        <View>
          {image && <Image source={{uri: image.uri}} style={{width: 300, height: 300}}></Image>}
          <TouchableOpacity onPress={uploadImage}>
        <Text>Upload</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  ); 
}

