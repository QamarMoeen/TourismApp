import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  Button,
  Image, 
  View, 
  Text,
  FlatList,
  Pressable,
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

const PlaceDetails = ({ route }) => {
  const { placeId } = route.params;
  const [place, setPlace] = useState(null);
  const [isFav, setIsFav] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'DancingScriptMid': require('./Assets2/Fonts/DancingScript-Medium.ttf'),
    'DancingScriptBold': require('./Assets2/Fonts/DancingScript-Bold.ttf'),
  });

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
          setPlace(data[0]); // Assuming there's only one place with the given ID
        }
      } catch (error) {
        console.error('Error fetching place:', error.message);
      }
    }

    fetchPlace();
  }, [placeId]);

  const setFavorited = async (fav) => {

        try {
          const { data,error } = await supabase
          .from('places')
          .update({ isfavourite: !fav })
          .eq('id', placeId)
          .select()
          if (error) {
            throw error;
          }
          if (data){
            setPlace(data[0]);
          }
        } catch (error) {
          console.error('Error updating info', error.message);
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
              <TouchableOpacity  onPress={() => setFavorited(place.isfavourite,place.id)}>
                <HeartIcon isFav={place.isfavourite} />
              </TouchableOpacity>
            </View>
            <Text style={styles.info}>{place.description}</Text>
          
        </View>
      </View>
    );
  };

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
    //color: '#c7f9cc',
  },
  addToFavorites: {
    color: '#FF6347', // Tomato color for the add to favorites text
    //fontSize: 24
  },
  titlerow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:280,
    marginBottom:25
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
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
