import React,{useLayoutEffect, useState, useRef} from 'react';
import {View, SafeAreaView, Text, FlatList, Dimensions} from 'react-native';
import { List } from '../../utils/storage.js';
import { FeedList } from '../Components/FeedList';
const {height: hScreen} = Dimensions.get('screen')

const ForYou = () => {
    const [data, setData] = useState([])
    const [showItem, setShowItem] = useState(FeedList[0])
    const onViewRef = useRef(({viewableItems})=>{
      if(viewableItems && viewableItems.length > 0){
        setShowItem(FeedList[viewableItems[0].index])
      }
    })

    useLayoutEffect(()=>{
        const fetchUserData = async () => {
            const item = await List();
            setData(item);
          };
      
          fetchUserData()
            .catch(error => {
              console.log('Erro ao buscar os usuários:', error);
            });
    },[])

    return (
        <SafeAreaView>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <FeedList data={item} currentItem={showItem}/>}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewRef.current}
          snapToAlignment='center'
          snapToInterval={hScreen}
          scrollEventThrottle={150}
          decelerationRate={'fast'}
          viewabilityConfig={{
            waitForInteraction: false,
            viewAreaCoveragePercentThreshold: 100
          }}
        />
        </SafeAreaView>
    );
}

export default ForYou;
