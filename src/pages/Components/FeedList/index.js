import { useEffect } from "react";
import { Image, SafeAreaView, Text, Dimensions, View, TouchableOpacity } from "react-native";
import { style } from "./style";
const {height: hScreen} = Dimensions.get('screen')
import {Ionicons} from '@expo/vector-icons'

export  function FeedList({data, currentItem}){
    return(
        <SafeAreaView>

        <View style={[style.infoUser,{bottom: 120}]}>
            <Text style={style.idUser}>
                {data?.name}
            </Text>
            <Text numberOfLines={2} style={style.infoVideo}>
                {data?.description}
            </Text>
        </View>

        <View style={style.actions}>
            <Image source={{uri: data?.video}}
            style={{width: 50, height: 50, borderRadius: 50, borderWidth: 2, borderColor: '#fafafa'}}
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

        <Image source={{uri: data?.video}}
        style={{width: '100%', height: hScreen}}
        resizeMode="cover"
        ></Image>
        </SafeAreaView>
    )
}