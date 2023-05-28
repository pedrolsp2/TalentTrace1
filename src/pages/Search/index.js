import React, {useState} from 'react';
import {View, StyleSheet, FlatList, SafeAreaView, Text} from 'react-native';
import firebase from "../../Configs/firebaseconfig.js"
import { UsersList } from '../Components/UsersList/index.js';

const Search = () => {
    const [users, setUsers] = useState([]);
const getUsers = async () => {
    try {
      const snapshot = await firebase.firestore().collection('users').get();
      const users = snapshot.docs.map(doc => doc.data());
      return users;
    } catch (error) {
      console.log('Erro ao buscar os usuários:', error);
      return [];
    }
  };
    getUsers()
    .then(users => {
    //console.log('Usuários:', users);
    setUsers(users)
    })
    .catch(error => {
    console.log('Erro ao buscar os usuários:', error);
    });

        return (
            <SafeAreaView>
                <FlatList
                  data={users}
                  key={(item)=>String(item.idUser)}
                  renderItem={({item})=><UsersList data={item}/>}
                  showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        );
    }

const styles = StyleSheet.create({})

export default Search;
