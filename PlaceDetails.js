import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  Image, 
  View, 
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { supabase } from './config/supabase';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import HeartIcon from './Assets2/SVG/HeartIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlaceDetails = ({ route,userId }) => {

  const { placeId } = route.params;
  const [place, setPlace] = useState(null);
  const [Fav, setFav] = useState(true);


      const [fontsLoaded, fontError] = useFonts({
        'DancingScriptBold': require('./Assets2/Fonts/DancingScript-Bold.ttf'),
      });

      const isLoading = !fontsLoaded || fontError;

  useEffect(() => {
    async function fetchPlace() {
      try {
        const { data, error } = await supabase
          .from('places')
          .select()
          .eq('id', placeId);
        if (error) {
          throw error;
        }
        if (data && data.length > 0) {
          setPlace(data[0]);
        }
      } catch (error) {
        console.error('Error fetching place:', error.message);
      }
    }

    fetchPlace();
  }, [placeId]);


  useEffect(() => {
    async function checkFav() {
      try {
        const { data, error } = await supabase
          .from('favourites')
          .select('placeid')
          .eq('userid', userId)
          .eq('placeid', placeId);
        if (error) {
          throw error;
        }
        if (data && data.length>0) {
          setFav(true);
        } else {setFav(false)}
      } catch (error) {
        console.error('Error identifying fav status:', error.message);
      }
    }

    checkFav();
  }, [userId,placeId]);

  

  const setFavorited = async (fav) => {
      if(fav){
        setFav(false);
        try {
          const { data,error } = await supabase
          .from('favourites')
          .delete()
          .eq('placeid', placeId)
          .eq('userid', userId)
          if (error) {
            throw error;
          }
        } catch (error) {
          console.error('Error updating info', error.message);
        }
      }else {
        setFav(true);
        try {
          const { data,error } = await supabase
          .from('favourites')
          .insert({placeid : placeId , userid: userId})
          if (error) {
            throw error;
          }
        } catch (error) {
          console.error('Error updating info', error.message);
        }
      }
  };

  const renderPlace = () => {
    if (!place) {
      return <Text>Loading...</Text>;
    }

    return (
      <View>
        <SafeAreaView></SafeAreaView>
        <View style={styles.itemContainer}>
          <Image
            style={styles.image}
            source={{
              uri: place.image,
            }}
          />
          
            <View style={styles.titlerow}>
              <Text style={styles.label}> {place.name}</Text>
              <TouchableOpacity  onPress={() => setFavorited(Fav)}>
                <HeartIcon Fav = {Fav} />
              </TouchableOpacity>
            </View>
            <Text style={styles.info}>{place.description}</Text>
          
        </View>
      </View>
    );
  };


  if(isLoading){
    <AppLoading/>
  }
  return (
    <View style={styles.container}>
      {renderPlace()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#57cc99',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#f4f3ee',
    borderRadius: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 270,
    height: 270,
    marginBottom: 20,
    borderRadius: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 28,
    fontFamily:'DancingScriptBold',
    textAlign:'center',
  },
  titlerow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:300,
    marginBottom:25
  },
  info: {
    fontSize: 15,
    width:270
  },
  iconBox:{
    backgroundColor:'#fff',
    height:35,
    width:35,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

export default PlaceDetails;
