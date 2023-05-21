import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { primaryColor, secundaryColor, TerColor, styles } from '../styles.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Password() {

  const [hidePass, setHidePass] = useState(true);
  const [password, setPassword] = useState('');
  const [newData, setNewData] = useState(null);
  const navigation = useNavigation();

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

  const handleAddPassword = async () => {
    const updatedData = { ...newData, senha: password };

    try {
      await AsyncStorage.setItem('@talenttrace:dataUsers', JSON.stringify(updatedData));
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("SkillsUser")
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.info}>
          <TouchableOpacity onPress={()=>navigation.navigate('NameUser')}> 
            <Ionicons
              name='chevron-back-outline'
              size={52}
              color={TerColor}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Informe uma senha para seu cadastro</Text>
          <Text style={styles.Text}>Informe uma senha segura, e sempre guarde ela apenas com você!</Text>
          <View style={styles.containerInput}>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='key-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Senha'
                  secureTextEntry={hidePass}
                  value={password}
                  onChangeText={setPassword}
                />
                {hidePass ?
                  <TouchableOpacity style={styles.iconEye}>
                    <Ionicons
                      name='eye-outline'
                      size={32}
                      color="#1C3F7C"
                      onPress={() => setHidePass(!hidePass)} />
                  </TouchableOpacity>

                  :

                  <TouchableOpacity style={styles.iconEye}>
                    <Ionicons
                      name='eye-off-outline'
                      size={32}
                      color="#1C3F7C"
                      onPress={() => setHidePass(!hidePass)} />
                  </TouchableOpacity>
                }
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='key-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Confirme sua senha'
                  secureTextEntry={hidePass}
                  value={password}
                  onChangeText={setPassword}
                />
                {hidePass ?
                  <TouchableOpacity style={styles.iconEye}>
                    <Ionicons
                      name='eye-outline'
                      size={32}
                      color="#1C3F7C"
                      onPress={() => setHidePass(!hidePass)} />
                  </TouchableOpacity>

                  :

                  <TouchableOpacity style={styles.iconEye}>
                    <Ionicons
                      name='eye-off-outline'
                      size={32}
                      color="#1C3F7C"
                      onPress={() => setHidePass(!hidePass)} />
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.Button} onPress={handleAddPassword}> 
          <Text style={styles.TextButton}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}