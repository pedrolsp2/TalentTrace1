import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { querryId, saveFavorites } from '../../utils/storage';

const ForYou = () => {
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const fetchUserData = async () => {
      const idUser = await querryId();
      return idUser
    };

    fetchUserData()
    .then(users => {
      setUser(users)
      })
      .catch(error => {
      console.log('Erro ao buscar os usuários:', error);
      });
      
  }, []);


  return (
    <View>
      {/* Conteúdo do componente */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ForYou;
