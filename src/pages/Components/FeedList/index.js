import React,{ useEffect, useState } from "react";
import { Image, SafeAreaView, Text, Dimensions, View, Pressable, Platform } from "react-native";
import { style } from "./style";
import { useNavigation } from "@react-navigation/native";
const {height: hScreen} = Dimensions.get('screen')

export  function FeedList({data, currentItem}){
    const navigation = useNavigation();
    return(
        <SafeAreaView>

        <Pressable
        onPress={() => navigation.navigate('UserProfile', { data: data.idUser })}
        style={[style.infoUser,{
        bottom: Platform.OS === 'android' ? 50 : 70,}]}>
            <Image source={{uri: data?.user}}
                style={style.cover}
                resizeMode="cover"
            />
            <View>
                <Text style={style.idUser}>
                    {data?.nome}
                </Text>
                <Text numberOfLines={2} style={style.infoVideo}>
                    {data?.descricao}
                </Text>
            </View>
        </Pressable>

        <Image source={{uri: data?.foto}}
        style={{width: '100%', height: hScreen-100}}
        resizeMode="cover"
        ></Image>
        </SafeAreaView>
    )
}