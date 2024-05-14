import { View, Text } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="friends" options={{ headerShown: false }} />
      <Stack.Screen
        name="friendRequests"
        options={{
          presentation: "modal",
          headerTitle: "Friend Requests",
          headerTitleStyle: { color: "darkorange", fontWeight: "bold" },
          headerLeft: () => (
            <Entypo
              name="cross"
              onPress={() => router.back()}
              size={30}
              color={"darkorange"}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
