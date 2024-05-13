import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import "react-native-reanimated";

export default function Index() {
  return (
    <View>
      <Button
        title="Register Button"
        onPress={() => router.replace("/register")}
      />
      <Button
        title="Forgot Your Password?"
        onPress={() => router.replace("/forgotpw")}
      />
    </View>
  );
}
