import React from 'react';
import { StatusBar } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/router';
import { useFonts, Poppins_400Regular, Poppins_600Medium, Poppins_700Bold} from '@expo-google-fonts/poppins'; 

export default function App() { 
  const [fontsLoaded ] = useFonts({
    Poppins_400Regular, 
    Poppins_600Medium,
    Poppins_700Bold
  }) 

  return (
    <NavigationContainer style={{ fontFamily: 'Poppins_400Regular'}}>
      <StatusBar backgroundColor="#1A0751" barStyle='light-content'/>
      <Routes/>
    </NavigationContainer>
  );
}
