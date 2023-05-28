import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import Index from '../pages/Index';
import ForYou from '../pages/ForYou';
import NewPost from '../pages/NewPost';
import Favorites from '../pages/Favorites';
import Search from '../pages/Search';

const Tab = createBottomTabNavigator();

export default function TabRouter() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#14AF6C",
        tabBarStyle: {
          backgroundColor: "#fafafa",
          borderTopWidth: 1,
          borderColor: '#fafafa',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          if (route.name === 'NewPost') {
            iconComponent = (
              <View
                style={{
                  width: size + 16,
                  height: size + 16,
                  borderRadius: (size + 16) / 2,
                  backgroundColor: "#14AF6C",
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AntDesign name="pluscircleo" size={size} color="#FFF" />
              </View>
            );
          } else if (route.name === 'ForYou') {
            iconComponent = <AntDesign name="videocamera" size={size} color={color} />;
          } else if (route.name === 'Index') {
            iconComponent = <AntDesign name="user" size={size} color={color} />;
          } else if (route.name === 'Favorites') {
            iconComponent = <AntDesign name="hearto" size={size} color={color} />;
          } else if (route.name === 'Search') {
            iconComponent = <AntDesign name="search1" size={size} color={color} />;
          }

          return iconComponent;
        },
      })}
    >
      <Tab.Screen name="ForYou" component={ForYou} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="NewPost" component={NewPost} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Index" component={Index} />
    </Tab.Navigator>
  );
}
