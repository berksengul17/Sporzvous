import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Login Page" }} />
      <Stack.Screen
        name="register"
        options={{ headerTitle: "Registration Page" }}
      />
      <Stack.Screen
        name="forgotpw"
        options={{ headerTitle: "Reset Password Page" }}
      />
      <Stack.Screen name="drawer" options={{ headerShown: false }} />
    </Stack>
  );
}
