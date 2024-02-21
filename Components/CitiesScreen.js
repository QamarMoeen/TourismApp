import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Button,
} from 'react-native';
import { supabase } from '../config/supabase';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

const CitiesScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);

  const [fontsLoaded, fontError] = useFonts({
    'DancingScriptMid': require('../Assets2/Fonts/DancingScript-Medium.ttf'),
    'DancingScriptBold': require('../Assets2/Fonts/DancingScript-Bold.ttf'),
  });

  const isLoading = !fontsLoaded || fontError;

  useEffect(() => {
    async function fetchCities() {
      try {
        const { data, error } = await supabase
          .from('cities')
          .select('*');
        if (error) {
          throw error;
        }
        if (data) {
          setCities(data);
        }
      } catch (error) {
        console.error('Error fetching cities:', error.message);
      }
    }

    fetchCities();
  }, [cities]);

  const renderItem = ({ item }) => {
    return (
      <Animated.View entering={FadeInDown.delay(item.id*130).duration(100).springify().damping(20)} >
        <Pressable onPress={() => navigation.navigate('Places', { cityId: item.id })}>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>{item.name}</Text>
          </View>
        </Pressable>
      </Animated.View>
     
    );
  };

  const signOut = () => {
    supabase.auth.signOut()
  }
  
  if(isLoading){
    <AppLoading/>
  }
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOut} />
      <Animated.View entering={FadeInRight.delay(200).duration(400)} >
      <Text style={styles.header}>CITIES</Text>
      </Animated.View>
      <FlatList
        data={cities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7f9cc',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
    paddingBottom:40
  },
  header: {
    fontSize: 40,
    fontWeight:'bold',
    fontStyle:'italic',
    padding: 10,
    color: '#3E3D3D',
  },
  itemContainer: {
    flex:1,
    margin:5,
    marginBottom: 20,
    backgroundColor: '#80ed99',
    padding: 7,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  label: {
    fontSize: 50,
    fontFamily:'DancingScriptMid',
    color: '#3E3D3D', // Darker text color for contrast
    width:'100%',
    height:'100%',
    paddingHorizontal:7,
    textAlign:'center'
  },
});

export default CitiesScreen;
