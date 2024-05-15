import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";

export default function ComplaintsHomePage() {
  const [category, setCategory] = useState("Category");
  const [title, setTitle] = useState("Title");

  return (
    <View style={styles.container}>
      <View style={styles.complaintsContainer}>
        <Text style={{ fontSize: 24, margin: 20 }}>
          Complaints and Feedbacks
        </Text>
        <View style={{ margin: 10 }}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: "Category 1", value: "tr" },
              { label: "Category 2", value: "en" },
              // Add more languages as needed
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false} // this needs to be false to use your custom styles
            placeholder={{ label: "Category", value: null }}
            value={category}
          />
        </View>
        <View style={{ margin: 10 }}>
          <RNPickerSelect
            onValueChange={(value) => setTitle(value)}
            items={[
              { label: "Title 1", value: "tr" },
              { label: "Title 2", value: "en" },
              // Add more languages as needed
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false} // this needs to be false to use your custom styles
            placeholder={{ label: "Title", value: null }}
            value={title}
          />
        </View>
        <View style={{ margin: 20, flexDirection: "row" }}>
          <TextInput
            placeholder="Content"
            placeholderTextColor={"#6F6F6F"}
            style={styles.contentBox}
            multiline={true}
          />
        </View>
        <Button
          onPress={() => Alert.alert("Submit clicked!")}
          title="Submit"
          color="#FF5C00"
        />
      </View>
      <View style={styles.wave}>
        <Image source={require("../../assets/images/Waves.png")} />
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentBox: {
    flexDirection: "row",
    padding: 10,
    height: 200,
    width: "70%",
    backgroundColor: "#F0F0F0",
    textAlignVertical: "top",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  wave: {
    position: "static",
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
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
