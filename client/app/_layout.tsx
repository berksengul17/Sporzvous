import { UserProvider } from "@/context/UserProvider";
import { EventProvider } from "@/context/EventProvider";
import {
  OpenSans_400Regular,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let [loaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold_Italic,
    JejuHallasan: require("../assets/fonts/JejuHallasan-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <EventProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="forgotpw" options={{ headerShown: false }} />
          <Stack.Screen name="drawer" options={{ headerShown: false }} />
        </Stack>
      </EventProvider>
    </UserProvider>
  );
}
