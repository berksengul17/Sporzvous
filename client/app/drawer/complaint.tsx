import React, { useState } from "react";
import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function ComplaintsHomePage() {
  const [category, setCategory] = useState("Category");
  const [title, setTitle] = useState("Title");
  const [content, setContent] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.complaintsContainer}>
          <Text  style={styles.headerText}>Complaints and Feedbacks</Text>
        
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: "Category 1", value: "category1" },
              { label: "Category 2", value: "category2" },
              // Add more categories as needed
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Select Category", value: null }}
            value={category}
          />
        </View>
        
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setTitle(value)}
            items={[
              { label: "Title 1", value: "title1" },
              { label: "Title 2", value: "title2" },
              // Add more titles as needed
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Select Title", value: null }}
            value={title}
          />
        </View>
        
        <View style={styles.contentBoxContainer}>
          <TextInput
            placeholder="Content"
            placeholderTextColor="#6F6F6F"
            style={styles.contentBox}
            multiline={true}
            value={content}
            onChangeText={setContent}
          />
        </View>
        
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => Alert.alert("Submit clicked!")}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  complaintsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 23,
    margin: 20,
    color: "#FF5C00",
    fontWeight: "bold",
  
  
  },
  pickerContainer: {
    width: "100%",
    marginVertical: 10,
  },
  contentBoxContainer: {
    width: "100%",
    marginVertical: 20,
  },
  contentBox: {
    padding: 10,
    height: 200,
    backgroundColor: "#F0F0F0",
    textAlignVertical: "top",
    borderRadius: 10,
    color: "black",
  },
  submitButton: {
    backgroundColor: "#FF5C00",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#FF5C00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    resizeMode: "cover",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#F0F0F0",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#6F6F6F",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#F0F0F0",
  },
});
