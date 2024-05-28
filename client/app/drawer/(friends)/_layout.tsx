import { Entypo } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="friends" options={{ headerShown: false }} />
      <Stack.Screen
        name="friendRequests"
        options={{
          presentation: "modal",
          headerTitle: "Friend Requests",
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
      <Stack.Screen name="chatScreen" options={{ headerShown: false}} />
    </Stack>
  );
};

export default Layout;
