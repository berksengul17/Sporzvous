import { FriendProvider } from "@/context/FriendProvider";
import { Entypo } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "@/context/DarkModeContext"; // Ensure this is the correct path to your DarkModeContext

const Layout = () => {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation("friendLayout");

  const screenOptions = {
    headerLeft: () => (
      <Entypo
        name="cross"
        onPress={() => router.back()}
        size={30}
        color={"#FF5C00"}
      />
    ),
  };

  return (
    <FriendProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? "#333" : "#fff",
          },
          headerTitleStyle: {
            color: "#FF5C00",
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="friends" options={{ headerShown: false }} />
        <Stack.Screen
          name="friendRequests"
          options={{
            presentation: "modal",
            headerTitle: t("friendRequests"),
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
        <Stack.Screen name="chatScreen" options={{ headerShown: false }} />
      </Stack>
    </FriendProvider>
  );
};

export default Layout;
