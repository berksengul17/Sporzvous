import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const friendsData = [
  { id: '1', name: 'Emre Erol', lastMessage: 'Last Message', imageUri: require('../../assets/images/friendpp.jpg'), lastSeenDay: 'Monday' },
  { id: '2', name: 'Jane Doe', lastMessage: 'Geliyorum', imageUri: require('../../assets/images/friendpp.jpg'), lastSeenDay: 'Tuesday' },
  { id: '3', name: 'John Smith', lastMessage: 'Last', imageUri: require('../../assets/images/friendpp.jpg'), lastSeenDay: 'Wednesday' },
  // add more friends here
];

const FriendItem = ({ friend }) => (
  <View style={styles.friendContainer}>
    <Image source={{ uri: friend.imageUri }} style={styles.profileImage} />
    <View style={styles.friendInfo}>
      <Text style={styles.friendName}>{friend.name}</Text>
      <View style={{flexDirection: 'row'}}>
        <FontAwesome5 name="check-double" size={14} color="orange" style={{padding: 5}}/>
        <Text style={styles.friendLastSeen}>{friend.lastMessage}</Text>
      </View>
    </View>
    <Text>{friend.lastSeenDay}</Text>
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
