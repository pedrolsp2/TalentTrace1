import React, { useLayoutEffect, useState, useRef } from 'react';
import { View, SafeAreaView, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { List } from '../../utils/storage.js';
import { FeedList } from '../Components/FeedList';
import firebase from '../../Configs/firebaseconfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height: hScreen } = Dimensions.get('screen')

const ForYou = () => {
  const db = firebase.firestore();
  const [data, setData] = useState([]);
  const [showItem, setShowItem] = useState(FeedList[0]);
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setShowItem(FeedList[viewableItems[0].index]);
    }
  });

  useLayoutEffect(() => {
    AsyncStorage.removeItem('@talenttrace:post');
    db.collection('post')
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const datas = doc.data();
          data.push(datas);
        });
        setData(data);
      })
      .catch((error) => {
        console.log('Erro ao buscar documentos:', error);
      });
  }, []);

  if (!data || data.length === 0) {
    return (
      <SafeAreaView style={style.container}>
        <Text style={style.emptyText}>Nenhum dado disponível.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => <FeedList data={item} currentItem={showItem} />}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        snapToAlignment="center"
        snapToInterval={hScreen-100}
        scrollEventThrottle={150}
        decelerationRate="fast"
        viewabilityConfig={{
          waitForInteraction: false,
          viewAreaCoveragePercentThreshold: 100
        }}
      />
    </SafeAreaView>
  );
}

export default ForYou;

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
