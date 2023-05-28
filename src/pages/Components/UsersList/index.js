import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Share, Linking } from "react-native";
import { styles } from './styles';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { firebase as fb } from '../../../Configs/firebasestorageconfig.js'

export function UsersList({ data }) {
    const [imageUrls, setImageUrls] = useState({ photoUri: null, coverUri: null });
    const storage = fb.storage();
    const navigation = useNavigation();

    useEffect(() => {
        fetchAllImages();
    }, []);

    const fetchAllImages = async () => {
        try {
            const imagesRef = storage.ref();
            const imagesSnapshot = await imagesRef.listAll();

            const imageUrls = [];

            for (const imageRef of imagesSnapshot.items) {
                const downloadUrl = await imageRef.getDownloadURL();
                imageUrls.push(downloadUrl);
            }

            const namePhoto = data.foto;
            let photoUri = null;

            for (const imageUrl of imageUrls) {
                const imageName = imageUrl.match(/\/o\/(.*?)\?alt/)[1];
                if (imageName === namePhoto) {
                    photoUri = imageUrl;
                    break;
                }
            }

            setImageUrls({ photoUri });
        } catch (error) {
            console.log('Erro ao buscar as imagens:', error);
            setImageUrls({ photoUri: null, coverUri: null });
        }
    };

        const onShare = async () => {
          try {
            const result = await Share.share({
              message:
                'Veja essa jovem promessa que encontrei no Talent Trace!',
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            Alert.alert(error.message);
          }
        };    

        const onShareWP = async () => {
            const phoneNumber = '5534996547587';
            const message = encodeURIComponent('Olá! Vim pelo TalentTrace! Vamos jogar?!');
            const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${message}&type=phone_number&app_absent=0`;

            Linking.openURL(url)
            .catch(error => console.log(error));
        }; 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerInfo}>
                <View style={styles.infoUser}>
                    <TouchableOpacity onPress={()=>navigation.navigate("UserProfile",{ params: { dataUser: data.idUser } })}>
                        <Image
                            source={{ uri: imageUrls.photoUri }}
                            style={styles.cover}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.NameUser}>{data.nome}</Text>
                        <Text style={styles.CityUser}>{data.idade} anos de {data.cidade}</Text>
                    </View>
                </View>
                <View style={styles.shareUser}>
                    <TouchableOpacity onPress={onShare}>
                        <Ionicons
                            name='logo-whatsapp'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onShareWP}>
                        <Ionicons
                            name='share-social-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.icons}>
                <View style={styles.iconsRow}>

                    <Text style={styles.icon}>
                        <Ionicons
                            name='location-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                        <Text style={styles.textIcon}> {data.cidade}</Text>

                    </Text>

                    <Text style={styles.icon}>
                        <Ionicons
                            name='body-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                        <Text style={styles.textIcon}> {data.altura}</Text>

                    </Text>

                    <Text style={styles.icon}>
                        <Ionicons
                            name='flag-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                        <Text style={styles.textIcon}> {data.posicao}</Text>

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
                        <Text style={styles.textIcon}> {data.idade} anos</Text>

                    </Text>

                    <Text style={styles.icon}>
                        <Ionicons
                            name='barbell-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                        <Text style={styles.textIcon}>  {data.peso}kg</Text>

                    </Text>

                    <Text style={styles.icon}>
                        <Ionicons
                            name='walk-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                        <Text style={styles.textIcon}> {data.perna}</Text>

                    </Text>

                </View>
            </View>
        </SafeAreaView>
    )
}
