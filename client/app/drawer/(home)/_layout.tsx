import { useUserContext } from "@/context/UserProvider";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";

const _layout = () => {
  const { isProfileEditable, setProfileEditable } = useUserContext();

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="createEventModal"
        options={{
          presentation: "modal",
          headerTitle: "Create a new event",
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
        name="filterModal"
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
      <Stack.Screen
        name="(profile)"
        options={{
          presentation: "modal",
          headerTitle: "Profile",
          headerTitleStyle: { color: "#FF5C00", fontWeight: "bold" },
          headerLeft: () => (
            <Entypo
              name="cross"
              onPress={() => router.back()}
              size={30}
              color={"#FF5C00"}
            />
          ),
          headerRight: () => (
            <FontAwesome
              name="pencil-square-o"
              size={30}
              color={isProfileEditable ? "#FF5C00" : "#6F6F6F"}
              onPress={() => {
                setProfileEditable(!isProfileEditable);
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="join_event"
        options={{
          presentation: "modal",
          headerTitle: "Join Event",
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

export default _layout;
