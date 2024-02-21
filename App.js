import 'react-native-url-polyfill/auto'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from './config/supabase'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CitiesScreen from './Components/CitiesScreen';
import PlacesScreen from './Components/PlacesScreen';
import PlaceDetails from './PlaceDetails';
import FavouritesScreen from './Components/FavouritesScreen';
import SplashScreen from './Components/SplashScreen';
import Auth from './Components/Auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Session } from '@supabase/supabase-js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const cityIcon = require('./Assets2/Icons/city.png');
const cityIcon_active = require('./Assets2/Icons/cityFilled.png');
const favIcon = require('./Assets2/Icons/favPlace.png');
const favIcon_active = require('./Assets2/Icons/favPlaceFilled.png');


const CitiesTab = ({userId}) => (
  <Stack.Navigator screenOptions={{headerShown : false}}>
    <Stack.Screen name="Home" component={CitiesScreen} />
    <Stack.Screen name="Places" component={PlacesScreen}/>
    <Stack.Screen name="PlaceInfo">
      {props => <PlaceDetails {...props} userId={userId} />}
    </Stack.Screen>
</Stack.Navigator>
);

const FavouritesTab = ({userId}) => (
  <Stack.Navigator screenOptions={{headerShown : false}}>
    <Stack.Screen name="Favourites">
      {props => <FavouritesScreen {...props} userId={userId} />}
    </Stack.Screen>
    <Stack.Screen name="PlaceInfo">
      {props => <PlaceDetails {...props} userId={userId} />}
    </Stack.Screen>
</Stack.Navigator>
);

const Tabs = ({userId}) => (
  <Tab.Navigator 
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => {
      let iconName;

      if (route.name === "Cities") {
        iconName = focused ? cityIcon_active : cityIcon;
      } else if (route.name === "Favourites") {
        iconName = focused ? favIcon_active : favIcon;
      }

      return (
        <Image source={iconName} resizeMode="contain" style={styles.footerIcon} />
      )
    },
    tabBarShowLabel: false,
    tabBarStyle: {
      position: "absolute",
      padding: 10,
      backgroundColor:'#f4f3ee',
      borderTopStartRadius: 40,
      borderTopEndRadius: 40,
    }
  })}
  >
          <Tab.Screen name='Cities'>
            {props => <CitiesTab {...props} userId={userId} />}
          </Tab.Screen>
          <Tab.Screen name="Favourites">
            {props => <FavouritesTab {...props} userId={userId} />}
          </Tab.Screen>
  </Tab.Navigator>
);



export default function App() {

  const [sesion, setSesion] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSesion(session)
      setUserId(sesion?.user.id);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSesion(session)
      setUserId(sesion?.user.id);
    })

    
  }, [])

  const isLoading = !userId;
 
  if (isLoading) {
  }
  return (
    
    <View style={styles.container}>
      <View style={{flex:1,backgroundColor:'blue',width:'100%'}}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown : false}}>
         <Stack.Screen name='Splash' component={SplashScreen}/>
          { sesion && sesion.user ? (
          <Stack.Screen name='App'> 
            {props => <Tabs {...props} userId={sesion?.user.id} />}
          </Stack.Screen>
          ) : (
          <Stack.Screen name='App' component={Auth}/>
          )}
          
        </Stack.Navigator>
      <StatusBar style="auto" />
      </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
  }
});

