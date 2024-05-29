import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="myevents" />
      <Stack.Screen name="mainEventScreen"/>
    </Stack>
  );
};

export default Layout;
