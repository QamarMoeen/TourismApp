import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
Button, 
View, 
Text,
FlatList,
Pressable,
StyleSheet,
 } from 'react-native';
import { supabase } from '../config/supabase';
import {useFonts} from 'expo-font';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import AppLoading from 'expo-app-loading';


const FavouritesScreen = ({navigation,userId}) => {


  const [placeIds, setPlaceIds] = useState();
  const [places, setPlaces] = useState([]);

  const [fontsLoaded, fontError] = useFonts({
    'DancingScriptSemiBold': require('../Assets2/Fonts/DancingScript-SemiBold.ttf'),
    'DancingScriptBold': require('../Assets2/Fonts/DancingScript-Bold.ttf'),
  });

  const isLoading = !fontsLoaded || fontError;  

  useEffect(() => {
    async function fetchPlaceIds() {
      try {
        const { data, error } = await supabase
          .from('favourites')
          .select('placeid')
          .eq('userid', userId );
        if (error) {
          throw error;
        }
        if (data) {
          let arr = data.map((item) => item.placeid)
          setPlaceIds(arr);
          fetchFavouritePlaces(arr);
        } 
      } catch (error) {
        console.error('Error fetching favourites:', error.message);
      }
    }

    async function fetchFavouritePlaces(ids) {
      try {
        const { data, error } = await supabase
          .from('places')
          .select('*')
          .in('id', ids );
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

    fetchPlaceIds();
    
  }, [placeIds]);



  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => {
        navigation.push('PlaceInfo',{placeId : item.id});
      navigation.navigate('PlaceInfo',{placeId : item.id});}}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };
  
  if(isLoading){
    <AppLoading/>
  }
  return (    
      <View style={styles.container}>
      <Animated.View entering={FadeInLeft.delay(200).duration(300)} >
      <Text style={styles.header}>Favourite Places</Text>
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
    flex:1,
    backgroundColor: '#d8f3dc', // Creamy background color
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom:40
  },
  header: {
    fontSize: 30,
    padding: 10,
    fontStyle:'italic',
    fontWeight:'700',
  },
  itemContainer: {
    margin:5,
    marginBottom: 20,
    backgroundColor: '#57cc99', // Peach background for favorite place items
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    height:100
  },
  label: {
    fontSize: 24,
    fontFamily:'DancingScriptSemiBold',
    marginBottom: 5,
    color: '#333',
  },
});



export default FavouritesScreen;
