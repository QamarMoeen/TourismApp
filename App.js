import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CitiesScreen from './Components/CitiesScreen';
import PlacesScreen from './Components/PlacesScreen';
import PlaceDetails from './PlaceDetails';
import FavouritesScreen from './Components/FavouritesScreen';
import SplashScreen from './Components/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const cityIcon = require('./Assets2/Icons/city.png');
const cityIcon_active = require('./Assets2/Icons/cityFilled.png');
const favIcon = require('./Assets2/Icons/favPlace.png');
const favIcon_active = require('./Assets2/Icons/favPlaceFilled.png');


const CitiesTab = () => (
  <Stack.Navigator screenOptions={{headerShown : false}}>
    <Stack.Screen name="Home" component={CitiesScreen} />
    <Stack.Screen name="Places" component={PlacesScreen}/>
    <Stack.Screen name="PlaceInfo" component={PlaceDetails}/>
</Stack.Navigator>
);

const FavouritesTab = () => (
  <Stack.Navigator screenOptions={{headerShown : false}}>
    <Stack.Screen name="Favourites" component={FavouritesScreen} />
    <Stack.Screen name="PlaceInfo" component={PlaceDetails}/>
</Stack.Navigator>
);

const Tabs = () => (
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
          <Tab.Screen name='Cities' component={CitiesTab}/>
          <Tab.Screen name='Favourites' component={FavouritesTab}/>
  </Tab.Navigator>
);



export default function App() {

  return (
    
    <View style={styles.container}>
      <View style={{flex:1,backgroundColor:'blue',width:'100%'}}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown : false}}>
          <Stack.Screen name='Splash' component={SplashScreen}/>
          <Stack.Screen name='Tabs' component={Tabs}/>
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
    backgroundColor: '#FDFDFD', // Light grayish background
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
  }
});

