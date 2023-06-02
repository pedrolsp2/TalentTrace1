import React, { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "../../../Configs/firebaseconfig.js"
import { styles } from './styles.js';
import { firebase as fb } from '../../../Configs/firebasestorageconfig.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfile() {
  const route = useRoute();
  const [like, setLike] = useState(false);
  const navigation = useNavigation();
  const storage = fb.storage();
  const [idUs, setIdUs] = useState('');
  const dataUser = route.params?.data;
  const [userData, setUserData] = useState(null);
  const [imageUrls, setImageUrls] = useState({ photoUri: null, coverUri: null });

  useEffect(() => {
    AsyncStorage.removeItem('@talenttrace:dataUsers');
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
        fetchAllImages(data[0]); // Chamada para buscar as imagens passando o usuário como argumento
      }
    });

    const fetchAllImages = async (userData) => {
      try {
        const imagesRef = storage.ref();
        const imagesSnapshot = await imagesRef.listAll();

        const imageUrls = [];

        for (const imageRef of imagesSnapshot.items) {
          const downloadUrl = await imageRef.getDownloadURL();
          imageUrls.push(downloadUrl);
        }

        const nameCover = userData.capa;
        let coverUri = null;
        const namePhoto = userData.foto;
        let photoUri = null;

        for (const imageUrl of imageUrls) {
          const imageName = imageUrl.match(/\/o\/(.*?)\?alt/)[1];
          if (imageName === nameCover) {
            coverUri = imageUrl;
            break;
          }
        }

        for (const imageUrl of imageUrls) {
          const imageName = imageUrl.match(/\/o\/(.*?)\?alt/)[1];
          if (imageName === namePhoto) {
            photoUri = imageUrl;
            break;
          }
        }
        setImageUrls({ photoUri, coverUri });
      } catch (error) {
        console.log('Erro ao buscar as imagens:', error);
        setImageUrls({ photoUri: null, coverUri: null });
      }
    };

    setIdUs(userData);

    return () => unsubscribe();
  }, [dataUser]);

  function handleHeart(){
    like? setLike(false) : setLike(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.coverContainer}>
          {imageUrls.coverUri ? (
            <Image source={{ uri: imageUrls.coverUri }} style={styles.cover} />
          ) :
            <View style={styles.skeleton}></View>
          }
          {imageUrls.photoUri ? (
            <Image source={{ uri: imageUrls.photoUri }} style={styles.profile} />
          ) :
            <View style={styles.skeletonImage}></View>
          }
          <TouchableOpacity style={styles.edit} onPress={handleHeart}>
            {like?
            <AntDesign name="hearto" size={20} color="#1c3f7c" />
            :
            <AntDesign name="heart" size={20} color="#1c3f7c" />
            }
          </TouchableOpacity>
        </View>
        <View style={styles.containerContnet}>
          <Text style={styles.Nome}>
            {userData && userData.nome}
          </Text>

          <View style={styles.containerInfoPlayer}>
            <Text style={styles.label}>
              Perfil do jogador
            </Text>
            <View style={styles.icons}>
              <View style={styles.iconsRow}>

                <Text style={styles.icon}>
                  <Ionicons
                    name='location-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}> {userData && userData.cidade}
                  </Text>

                </Text>

                <Text style={styles.icon}>
                  <Ionicons
                    name='body-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>
                    {userData && userData.altura}
                  </Text>

                </Text>

                <Text style={styles.icon}>
                  <Ionicons
                    name='flag-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>
                    {userData && userData.posicao}
                  </Text>

                </Text>

              </View>

              <View style={styles.iconsRow}>

                <Text style={styles.icon}>
                  <Ionicons
                    name='person-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>
                    {userData && userData.idade}
                     anos</Text>

                </Text>

                <Text style={styles.icon}>
                  <Ionicons
                    name='barbell-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>
                    {userData && userData.peso}
                    kg</Text>

                </Text>

                <Text style={styles.icon}>
                  <Ionicons
                    name='walk-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>
                    {userData && userData.perna}
                  </Text>
                </Text>
              </View>
            </View>
            <Text style={styles.label}>
              Por onde passei
            </Text>
            <Text style={styles.textP}>
              {userData && userData.passou}
            </Text>
            <Text style={styles.label}>
              Sobre mim
            </Text>
            <Text style={styles.textP}>
              {userData && userData.sobre}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
