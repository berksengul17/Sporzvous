import { CommentProvider } from "@/context/CommentProvider";
import { useDarkMode } from "@/context/DarkModeContext"; // Ensure this is the correct path to your DarkModeContext
import { Entypo } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { t } = useTranslation("profileLayout");
  const { isDarkMode } = useDarkMode();

  return (
    <CommentProvider>
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen
          name="comments"
          options={{
            presentation: "modal",
            headerTitle: t("comments"),
            headerTitleStyle: { color: "#FF5C00", fontWeight: "bold" },
            headerStyle: { backgroundColor: isDarkMode ? "#333" : "#fff" },
            headerTitleStyle: {
              color: "#FF5C00",
              fontWeight: "bold",
            },
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
            headerTitle: t("filter"),
            headerTitleStyle: { color: "#FF5C00", fontWeight: "bold" },
            headerStyle: { backgroundColor: isDarkMode ? "#333" : "#fff" },
            headerTitleStyle: {
              color: isDarkMode ? "#FF5C00" : "#FF5C00",
              fontWeight: "bold",
            },
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
    </CommentProvider>
  );
};

export default Layout;
