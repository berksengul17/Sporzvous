import React from "react";
import { Stack, router } from "expo-router";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { SlideInRight } from "react-native-reanimated";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="createEventModal"
        options={{
          presentation: "modal",
          headerTitle: "Create a new event",
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
      <Stack.Screen
        name="filterModal"
        options={{
          presentation: "modal",
          headerTitle: "Filter",
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
      <Stack.Screen
        name="profile"
        options={{
          presentation: "modal",
          headerTitle: "Sporzvous",
          headerTitleStyle: { color: "darkorange", fontWeight: "bold" },
          headerLeft: () => (
            <Entypo
              name="cross"
              onPress={() => router.back()}
              size={30}
              color={"darkorange"}
            />
          ),
          headerRight: () => (
            <FontAwesome
              name="pencil-square-o"
              size={30}
              color={"darkorange"}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;
