import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';


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
      <View style={styles.titleview}>
          <Text style={styles.title}>Upcoming Events</Text>
          <TouchableOpacity style={{justifyContent:'center'}}>
            <AntDesign name="filter" size={40} color="orange" style={{}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent:'center'}}>
            <AntDesign name="plussquare" size={40} color="orange" />
          </TouchableOpacity>
        </View>
        <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
          {key: 'Julie1'},
          {key: 'Julie2'},
          {key: 'Julie3'},
          {key: 'Julie4'},
          {key: 'Julie5'},
          {key: 'Julie6'},
          {key: 'Julie7'},
          {key: 'Julie8'},
          {key: 'Julie9'},
          {key: 'Julie10'},
          {key: 'Julie11'},
          {key: 'Julie111'},
          {key: 'Julie1111'},
          {key: 'Julie11111'},
          {key: 'Julie111111'},
          {key: 'Julie1111111'},
          {key: 'Julie111111111'},
          {key: 'Julie222'},
          {key: 'Julie2222'},
          {key: 'Julie22222'},
          {key: 'Julie33'},
          {key: 'Julie44'},
          {key: 'Julie55'},
          {key: 'Julie66'},
          {key: 'Julie77'},
          {key: 'Julie88'},
          {key: 'Julie99'},
        ]}
        renderItem={({item, index}) => <Text key={index}>{item.key}</Text>}
      />
      <View style={styles.wave}>
      <Image source={require('../../assets/images/Waves.png')}/>
      </View>
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
  titleview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '3%',
  },
  searchText: {
    marginLeft: 10,
    color: 'gray',
    flex: 1
  },
  content: {
   padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'orange',
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
  wave: {
    position: 'static',
    bottom: 0,
    width: '100%',
    resizeMode: 'cover',
  }
});
