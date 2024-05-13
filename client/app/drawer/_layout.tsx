import { View, Text } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";

const Layout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="home"
        options={{
          headerTitle: "Homepage",
          drawerLabel: "Homepage",
        }}
      />
      <Drawer.Screen
        name="friends"
        options={{ headerTitle: "My Friends", drawerLabel: "My Friends" }}
      />
    </Drawer>
  );
};

export default Layout;
