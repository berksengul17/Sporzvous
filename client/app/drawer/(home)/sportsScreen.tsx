import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const sportsData = [
  { id: '1', name: 'Basketball', icon: 'basketball' },
  { id: '2', name: 'Football', icon: 'soccer' },
  { id: '3', name: 'Volleyball', icon: 'volleyball' },
  { id: '4', name: 'Tennis', icon: 'tennis' },
  { id: '5', name: 'Baseball', icon: 'baseball' },
  { id: '6', name: 'Badminton', icon: 'badminton' },
  { id: '7', name: 'Handball', icon: 'handball' },
  { id: '8', name: 'Ice Hockey', icon: 'hockey-puck' },
  { id: '9', name: 'Paintball', icon: 'pistol' }, // Updated icon
];

const SportCard = ({ sport }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: 'drawer/(home)/home',
      params: { sport: sport.name },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <MaterialCommunityIcons name={sport.icon} size={40} color="#FF5C00" />
      <Text style={styles.cardText}>{sport.name}</Text>
    </TouchableOpacity>
  );
};

export default function SportsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sportsData}
        renderItem={({ item }) => <SportCard sport={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2} // Updated to 2 columns
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row} // Center the items in each row
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140, // Adjusted width for 2 cards per row
    height: 140, // Adjusted height for consistency
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14, // Adjusted font size for better fit
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Centered text
  },
});
