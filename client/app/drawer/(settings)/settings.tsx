import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDarkMode } from "@/context/DarkModeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

export default function SettingsScreen() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [language, setLanguage] = useState("tr");

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#333" : "white" }}>
      <ScrollView style={styles.container}>
        <View style={styles.settingItem}>
          <Text
            style={[
              styles.settingText,
              { color: isDarkMode ? "white" : "black" },
            ]}
          >
            Dark Mode
          </Text>
          <Switch
            trackColor={{ false: "purple", true: "#FF5C00" }}
            thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
        <View style={styles.settingItem}>
          <Text
            style={[
              styles.settingText,
              { color: isDarkMode ? "white" : "black" },
            ]}
          >
            Language
          </Text>
          <RNPickerSelect
            onValueChange={(value) => setLanguage(value)}
            items={[
              { label: "Turkish", value: "tr" },
              { label: "English", value: "en" },
            ]}
            style={pickerSelectStyles(isDarkMode)}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Select a language...", value: null }}
            value={language}
          />
        </View>
        <View style={styles.settingItem}>
          <TouchableOpacity
            onPress={() => router.push("drawer/(settings)/faq")}
          >
            <Text
              style={[
                styles.settingText,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              F.A.Q.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingText: {
    fontSize: 18,
  },
});

const pickerSelectStyles = (isDarkMode) =>
  StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#6F6F6F",
      borderRadius: 4,
      color: isDarkMode ? "white" : "black",
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: isDarkMode ? "#555" : "white",
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: "#6F6F6F",
      borderRadius: 8,
      color: isDarkMode ? "white" : "black",
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: isDarkMode ? "#555" : "white",
    },
  });
