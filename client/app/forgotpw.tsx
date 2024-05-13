import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";

const Page = () => {
  return (
    <View>
      <Text>Forgot Password Page</Text>
      <Button title="Back to Log in Page" onPress={() => router.replace("/")} />
    </View>
  );
};

export default Page;
