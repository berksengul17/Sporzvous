import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";

const Page = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <Text>Set Profile Page</Text>
      <Button title="go home" onPress={() => router.replace("drawer")} />
    </View>
  );
};

export default Page;
