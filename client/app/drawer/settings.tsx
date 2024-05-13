import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';  // Import the Picker

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('tr');

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Language</Text>
        <RNPickerSelect
          onValueChange={(value) => setLanguage(value)}
          items={[
            { label: 'Turkish', value: 'tr' },
            { label: 'English', value: 'en' },
            // Add more languages as needed
          ]}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false} // this needs to be false to use your custom styles
          placeholder={{ label: "Select a language...", value: null }}
          value={language}
        />
      </View>
    </ScrollView>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
