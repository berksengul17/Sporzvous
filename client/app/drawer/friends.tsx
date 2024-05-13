import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const friendsData = [
  { id: '1', name: 'Emre Erol', lastSeen: '1 Hour', imageUri: require('../../assets/images/friendpp.jpg') },
  { id: '2', name: 'Jane Doe', lastSeen: '2 Hours', imageUri: require('../../assets/images/friendpp.jpg') },
  { id: '3', name: 'John Smith', lastSeen: '5 Minutes', imageUri: require('../../assets/images/friendpp.jpg') },
  // add more friends here
];

const FriendItem = ({ friend }) => (
  <View style={styles.friendContainer}>
    <Image source={{ uri: friend.imageUri }} style={styles.profileImage} />
    <View style={styles.friendInfo}>
      <Text style={styles.friendName}>{friend.name}</Text>
      <Text style={styles.friendLastSeen}>Last seen: {friend.lastSeen}</Text>
    </View>
    <TouchableOpacity style={styles.iconButton}>
      <AntDesign name="message1" size={24} color="orange" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconButton}>
      <AntDesign name="adduser" size={24} color="orange" />
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput style={styles.searchText} placeholder='Search'/>
        </View>
        <TouchableOpacity style={{marginTop: '2%', marginRight:'2%'}}>
          <MaterialCommunityIcons name="email-send" size={45} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: '2%', marginRight:'2%'}}>
          <AntDesign name="adduser" size={45} color="orange" />
        </TouchableOpacity>
      </View>
      <FlatList
         data={friendsData}
         renderItem={({ item }) => <FriendItem friend={item} />}
         keyExtractor={item => item.id}
         style={styles.list}
      />
      <View style={styles.wave}>
        <Image source={require('../../assets/images/Waves.png')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
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
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  friendContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 10,
    backgroundColor: '#FFF', // Change this as necessary
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendLastSeen: {
    color: 'grey',
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  wave: {
    position: 'static',
    bottom: 0,
    width: '100%',
    resizeMode: 'cover',
  }
});
