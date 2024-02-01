import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { supabase } from '../config/supabase';

const CountriesScreen = ({ navigation }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const { data, error } = await supabase
          .from('countries')
          .select('*');
        if (error) {
          throw error;
        }
        if (data) {
          setCountries(data);
        }
      } catch (error) {
        console.error('Error fetching cities:', error.message);
      }
    }

    fetchCountries();
  }, [countries]);

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate('Home', { countryId: item.id })}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
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
    backgroundColor: '#F9F8F6', // Light beige background
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#FFAC81', // Peach background for city items
    padding: 16,
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3E3D3D', // Darker text color for contrast
  },
});

export default CountriesScreen;
