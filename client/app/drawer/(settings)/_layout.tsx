import { View, Text } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useDarkMode } from "@/context/DarkModeContext"; // Adjust the import path as necessary

export const unstable_settings = {
  initialRouteName: "settings",
};

const Layout = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <Stack>
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen
        name="faq"
        options={{
          presentation: "modal",
          headerTitle: "Filter",
          headerStyle: { backgroundColor: isDarkMode ? "#333" : "#fff" },
          headerTitleStyle: { color: "#FF5C00", fontWeight: "bold" },
          headerLeft: () => (
            <Entypo
              name="cross"
              onPress={() => router.back()}
              size={30}
              color={"#FF5C00"}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
