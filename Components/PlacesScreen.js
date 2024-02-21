import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
Button, 
View, 
Text,
FlatList,
Pressable,
StyleSheet
 } from 'react-native';
import { supabase } from '../config/supabase';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

const PlacesScreen = ({route , navigation}) => {

  const {cityId} = route.params;
  const [places, setPlaces] = useState([]);
  

  const [fontsLoaded, fontError] = useFonts({
    'DancingScriptReg': require('../Assets2/Fonts/DancingScript-Regular.ttf'),
    'DancingScriptMid': require('../Assets2/Fonts/DancingScript-Medium.ttf'),
  });

  const isLoading = !fontsLoaded || fontError;

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const { data, error } = await supabase
          .from('places')
          .select()
          .eq('city_id',cityId);
        if (error) {
          throw error;
        }
        if (data) {
          setPlaces(data);
        }
      } catch (error) {
        console.error('Error fetching places:', error.message);
      }
    }

    fetchPlaces();
  }, [places]);


  const renderItem = ({ item }) => {
    return (
      <Animated.View entering={FadeInDown.delay(item.id*50).duration(500).springify().damping(12)} >
      <Pressable onPress={() => navigation.navigate('PlaceInfo',{placeId : item.id})}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>{item.name}</Text>
        </View>
      </Pressable>
      </Animated.View>
    );
  };
  
  if(isLoading){
    <AppLoading/>
  }
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInLeft.delay(200).duration(300)} >
      <Text style={styles.header}>Famous Places</Text>
      </Animated.View>
        <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80ed99',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom:40
  },
  header: {
    fontSize: 35,
    padding: 10,
    fontStyle:'italic',
    fontWeight:'500',
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#57cc99',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin:5
  },
  label: {
    fontSize: 24,
    fontFamily:'DancingScriptReg',
    marginBottom: 8,
    color: '#333333', // Dark gray text color
    textAlign:'center'
  },
});


export default PlacesScreen;
