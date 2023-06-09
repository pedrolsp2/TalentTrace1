import React,{ useEffect, useState } from "react";
import { Image, SafeAreaView, Text, Dimensions, View, TouchableOpacity, Platform } from "react-native";
import { style } from "./style";
const {height: hScreen} = Dimensions.get('screen')
import {Ionicons} from '@expo/vector-icons'

export  function FeedList({data, currentItem}){
    return(
        <SafeAreaView>

        <View style={[style.infoUser,{
        bottom: Platform.OS === 'android' ? 80 : 150,}]}>
            <Text style={style.idUser}>
                {data?.nome}
            </Text>
            <Text numberOfLines={2} style={style.infoVideo}>
                {data?.descricao}
            </Text>
        </View>

        <View style={style.actions}>
            <Image source={{uri: data?.idUser}}
            style={{width: Platform.OS === 'android' ? 50 : 65, height: Platform.OS === 'android' ? 50 : 65, borderRadius: Platform.OS === 'android' ? 50 : 65, borderWidth: 2, borderColor: '#fafafa'}}
            resizeMode="cover"
            />
            <TouchableOpacity style={style.actionsBtn}>
                <Ionicons name="heart" size={35} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={style.actionsBtn}>
                <Ionicons name="chatbubble-ellipses" size={35} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={style.actionsBtn}>
                <Ionicons name="bookmark" size={35} color="#fff"/>
            </TouchableOpacity>
        </View>

        <Image source={{uri: data?.foto}}
        style={{width: '100%', height: hScreen}}
        resizeMode="cover"
        ></Image>
        </SafeAreaView>
    )
}