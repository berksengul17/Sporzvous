import { View, Text } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="home"
        options={{
          headerTitle: "Homepage",
          drawerLabel: "Homepage",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="friends"
        options={{
          headerTitle: "My Friends",
          drawerLabel: "My Friends",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="inbox"
        options={{
          headerTitle: "Inbox",
          drawerLabel: "Inbox",
          drawerIcon: ({ size, color }) => (
            <FontAwesome name="envelope-o" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="myevents"
        options={{
          headerTitle: "My Events",
          drawerLabel: "My Events",
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="complaint"
        options={{
          headerTitle: "Complaint",
          drawerLabel: "Complaint",
          drawerIcon: ({ size, color }) => (
            <FontAwesome name="warning" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          drawerLabel: "Settings",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default Layout;
