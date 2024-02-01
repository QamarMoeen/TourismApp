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
 import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../config/supabase';
import {useFonts} from 'expo-font';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";


const FavouritesScreen = ({navigation}) => {

  const [places, setPlaces] = useState([]);

  const [fontsLoaded, fontError] = useFonts({
    'DancingScriptMid': require('../Assets2/Fonts/DancingScript-Medium.ttf'),
    'DancingScriptSemiBold': require('../Assets2/Fonts/DancingScript-SemiBold.ttf'),
  });

  //setCityId(id.toString);
  const holder = true;

  useEffect(() => {
    async function fetchFavouritePlaces() {
      try {
        const { data, error } = await supabase
          .from('places')
          .select('*')
          .eq('isfavourite', holder );
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

    fetchFavouritePlaces();
  }, [places]);


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
  

  return (
    <View>
      
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8f3dc', // Creamy background color
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom:40
  },
  header: {
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold',
    fontStyle:'italic'
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
