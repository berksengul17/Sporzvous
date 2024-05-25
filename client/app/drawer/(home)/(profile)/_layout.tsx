import { View, Text } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen
        name="comments"
        options={{
          presentation: "modal",
          headerTitle: "Comments",
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
      <Stack.Screen
        name="filterComments"
        options={{
          presentation: "modal",
          headerTitle: "Filter",
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
