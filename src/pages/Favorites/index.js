import React, {useState, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList, SafeAreaView, Text} from 'react-native';
import firebase from "../../Configs/firebaseconfig.js"
import { FavoriteList } from '../Components/FavoriteList/index.js';
import { querryId } from '../../utils/storage.js';

const Favorites = () => {
const [datas, setDatas] = useState('');
const [myUser, setMyUser] = useState('');

useLayoutEffect(()=>{

  const fetchUserData = async () => {
    const idUser = await querryId();
    setMyUser(idUser);
  };

  fetchUserData()
    .catch(error => {
      console.log('Erro ao buscar os usuários:', error);
    });
  fetchFavoritesByUserId(myUser)

  async function fetchFavoritesByUserId(userId) {
    const favoritesRef = firebase.firestore().collection('favorites');
    const querySnapshot = await favoritesRef.where('idUser', '==', userId).get();
    
    const idUserFavorites = [];
    querySnapshot.forEach((doc) => {
      const favorite = doc.data();
      idUserFavorites.push(favorite.idUserFavorite);
    });      
    const data = [];

    for (const userId of idUserFavorites) {
      const usersRef = firebase.firestore().collection('users');
      const querySnapshot = await usersRef.where('idUser', '==', userId).get();
  
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        data.push(userData);
      });
    }
    setDatas(data)
    return data;
  }

},[datas])

        return (
            <SafeAreaView>
                <FlatList
                  data={datas}
                  key={(item)=>String(item.idUser)}
                  renderItem={({item})=><FavoriteList data={item}/>}
                  showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        );
    }

const styles = StyleSheet.create({})

export default Favorites;
