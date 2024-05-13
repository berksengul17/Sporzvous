import React from "react";
import { Drawer } from "expo-router/drawer";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawerContent = (props: any) => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: top }}
      >
        <DrawerItemList {...props} />
        <DrawerItem
          labelStyle={{ marginLeft: -20 }}
          label={"Log out"}
          onPress={() => router.replace("/")}
          icon={({ color, size }) => (
            <Ionicons name="log-out" color={color} size={size} />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const Layout = () => {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerTintColor: "orange",
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: "#4E3833",
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: {
          backgroundColor: "orange",
        },
      }}
    >
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
