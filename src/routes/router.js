import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from '../pages/Welcome'
import LetsGo from '../pages/LetsGo'
import Login from "../pages/Login";
import Index from '../pages/Index';
import NameUser from '../pages/NewAccount/Name'
import PasswordUser from '../pages/NewAccount/Password'
import SkillsUser from '../pages/NewAccount/Skills'
import DescritionUser from '../pages/NewAccount/Descrition'
import PictureUser from '../pages/NewAccount/Picture'
import CoverUser from '../pages/NewAccount/Cover'
import VideoUser from '../pages/NewAccount/Video'


const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
              {/* <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            /> 
            <Stack.Screen
                name="LetsGo"
                component={LetsGo}
                options={{ headerShown: false }}
        />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NameUser"
                component={NameUser}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PasswordUser"
                component={PasswordUser}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SkillsUser"
                component={SkillsUser}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DescritionUser"
                component={DescritionUser}
                options={{ headerShown: false }}
            /> 
             <Stack.Screen
                name="PictureUser"
                component={PictureUser}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CoverUser"
                component={CoverUser}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="VideoUser"
                component={VideoUser}
                options={{ headerShown: false }}
            />  */}
            <Stack.Screen
                name="Index"
                component={Index}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}