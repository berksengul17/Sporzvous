import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" />
          <Text style={styles.searchText}>Search</Text>
        </View>
        <TouchableOpacity style={{marginTop: '2%'}}>
          <Ionicons name="person-circle" size={60} color="black" />
          <Text style={{alignSelf:'center'}}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleview}>
          <Text style={styles.title}>Upcoming Events</Text>
          <TouchableOpacity style={{justifyContent:'center'}}>
            <AntDesign name="filter" size={40} color="black" style={{}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent:'center'}}>
            <AntDesign name="plussquare" size={40} color="black" />
          </TouchableOpacity>
        </View>
      <ScrollView style={styles.content}>
        <View style={styles.event}>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.eventName}>Title of the event</Text>
          <Text style={styles.sport}>Sport</Text>
        </View>
        <View style={styles.event}>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.eventName}>Title of the event</Text>
          <Text style={styles.sport}>Sport</Text>
        </View>
        <View style={styles.event}>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.eventName}>Title of the event</Text>
          <Text style={styles.sport}>Sport</Text>
        </View>
        <View style={styles.event}>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.eventName}>Title of the event</Text>
          <Text style={styles.sport}>Sport</Text>
        </View>
        <View style={styles.event}>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.eventName}>Title of the event</Text>
          <Text style={styles.sport}>Sport</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
    
  },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F0F0F0',
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
  
    flexGrow: 1
  },
  titleview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '3%'
  },
  searchText: {
    marginLeft: 10,
    color: 'gray',
  },
  content: {
   padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  event: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontWeight: 'bold',
  },
  eventName: {
    color: 'gray',
  },
  sport: {
    fontStyle: 'italic',
  },
});
