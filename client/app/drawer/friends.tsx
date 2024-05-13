import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput style={styles.searchText} placeholder='Search'/>
        </View>
        <TouchableOpacity style={{marginTop: '2%', marginRight:'2%'}}>
          <Ionicons name="person-circle" size={60} color="black" />
          <Text style={{alignSelf:'center'}}>Profile</Text>
        </TouchableOpacity>
      </View>


      
      <View style={styles.wave}>
        <Image source={require('../../assets/images/Waves.png')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F0F0F0',
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 1
  },
  searchText: {
    marginLeft: 10,
    color: 'gray',
    flex: 1
  },
  wave: {
    position: 'static',
    bottom: 0,
    width: '100%',
    resizeMode: 'cover',
  }
});
