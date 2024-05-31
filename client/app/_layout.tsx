import { EventProvider } from "@/context/EventProvider";
import { UserProvider } from "@/context/UserProvider";
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import websocket from "websocket";
import * as encoding from "text-encoding";
import { WebSocket } from "ws";
import { TextDecoder, TextEncoder } from "text-encoding";
import { DarkModeProvider } from "@/context/DarkModeContext";

// Example usage
const decoder = new TextDecoder("utf-8");
const encoder = new TextEncoder();

// Object.assign(global, { WebSocket });
Object.assign(global, { WebSocket: websocket.w3cwebsocket });

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let [loaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold_Italic,
    OpenSans_700Bold,
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
    <DarkModeProvider>
      <UserProvider>
        <EventProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="forgotpw" options={{ headerShown: false }} />
            <Stack.Screen
              name="verificationCode"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="setNewPassword"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="information" options={{ headerShown: false }} />
            <Stack.Screen name="setProfile" options={{ headerShown: false }} />
            <Stack.Screen name="setProfile2" options={{ headerShown: false }} />
            <Stack.Screen name="setProfile3" options={{ headerShown: false }} />
            <Stack.Screen name="setProfile4" options={{ headerShown: false }} />
            <Stack.Screen name="setProfile5" options={{ headerShown: false }} />
            <Stack.Screen name="drawer" options={{ headerShown: false }} />
          </Stack>
        </EventProvider>
      </UserProvider>
    </DarkModeProvider>
  );
}
