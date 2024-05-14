import { View, Text, StyleSheet, SafeAreaViewBase, SafeAreaView, TextInput, Button, Image, Alert } from "react-native";
import React from "react";
import { Rating } from 'react-native-ratings';
import CustomButton from '../../../components/CustomButton';

const Page = () => {
  return (
    <SafeAreaView style={styles.createEventContainer}>
      <View style={styles.eventInformationContainer}>
        <View style={styles.eventInformationRow}>
          <View style={styles.eventInformationTitle}>
            <Text style={styles.eventInformationTitleFonts}>Title</Text>
          </View>
          <View style={styles.eventInformationInput}>
            <TextInput  clearTextOnFocus='true' placeholder="Esenyurt Halısaha" placeholderTextColor={'grey'} style={styles.inputBox}/>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.eventInformationTitle}>
            <Text style={styles.eventInformationTitleFonts}>Sport</Text>
          </View>
          <View style={styles.eventInformationInput}>
            <TextInput placeholder="Football" placeholderTextColor={'grey'} style={styles.inputBox}/>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.eventInformationTitle}>
            <Text style={styles.eventInformationTitleFonts}>Location</Text>
          </View>
          <View style={styles.eventInformationInput}>
               <TextInput placeholder="İstanbul" placeholderTextColor={'grey'} style={styles.inputBox}/>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.eventInformationTitle}>
            <Text style={styles.eventInformationTitleFonts}>People Count</Text>
          </View>
          <View style={styles.eventInformationInput}>
            <TextInput placeholder="14" placeholderTextColor={'grey'} style={styles.inputBox}/>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.eventInformationTitle}>
            <Text style={styles.eventInformationTitleFonts}>Team Count</Text>
          </View>
          <View style={styles.eventInformationInput}>
            <TextInput placeholder="2" placeholderTextColor={'grey'} style={styles.inputBox}/>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.eventInformationTitle}>
            <Text style={styles.eventInformationTitleFonts}>Date</Text>
          </View>
          <View style={styles.eventInformationInput}>
            <TextInput placeholder="11.01.2021" placeholderTextColor={'grey'} style={styles.inputBox}/>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.eventInformationTitle}>
            <Text style={styles.eventInformationTitleFonts}>Time</Text>
          </View>
          <View style={styles.eventInformationInput}>
            <TextInput placeholder="14:00" placeholderTextColor={'grey'} style={styles.inputBox}/>
          </View>
        </View>
        <View style={styles.eventInformationRow}>
          <View style={styles.eventInformationTitle}>
            <Text numberOfLines={2} style={styles.eventInformationTitleFonts}>Minimum Skill Level</Text>
          </View>
          <View style={styles.ratingStars}>
             <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            style={styles.ratingStars}
            onFinishRating={(rating) => console.log('Rated: ', rating)}
            />
          </View>
        </View>
    
      </View>
      <View style={styles.buttonContainer}>
        <Button 
        title="Choose Location"
        onPress={() => Alert.alert('Button clicked')}
        color="green"/>
        <CustomButton
        title="Create"
        onPress={() => Alert.alert('Button clicked')}/>
      </View >
      <View style={styles.wave}>
        <Image source={require("../../../assets/images/Waves.png")} />
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  createEventContainer: {
    backgroundColor: 'white',
    flex: 1
  },

  eventInformationContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  eventInformationRow: {
    flexDirection: 'row',
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  eventInformationTitle: {
    flex:1, 
    flexDirection: 'row'
  },

  inputBox: {
    flexDirection: 'row',
    borderRadius: 10,
    borderStyle: 'solid',
    flex:1,
    backgroundColor: '#F0F0F0',
    margin: 2,
    paddingHorizontal: 10 
    
  },

  eventInformationInput: {
    flex:1,
    justifyContent: 'flex-start',
    paddingHorizontal: 2
  },

  skillLevelContainer: {
    flexDirection: 'row',
    padding: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  eventInformationTitleFonts: {
    fontSize: 20
  },
  ratingStars: {
    padding: 7,
  },
  wave: {
    position: "static",
    bottom: -35,
    width: "100%",
    resizeMode: "cover",
  },
}); 