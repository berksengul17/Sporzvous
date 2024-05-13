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
        <TextInput 
          placeholder='Search'
          style={styles.input}
        /> 
        <MaterialCommunityIcons name="email-send-outline" size={24} color="black" />
        <AntDesign name="adduser" size={24} color="black" />
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
    margin: 5
  },
  input: {

  },
  wave: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    resizeMode: 'cover',
  }
});
