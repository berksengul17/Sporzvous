import { useDarkMode } from "@/context/DarkModeContext";
import { Entypo } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation("myeventsLayout");

  return (
    <Stack>
      <Stack.Screen name="myevents" options={{ headerShown: false }} />
      <Stack.Screen name="mainEventScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="filterEvents"
        options={{
          presentation: "modal",
          headerTitle: t("filter"),
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
