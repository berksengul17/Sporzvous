import { useUserContext } from "@/context/UserProvider";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = () => {
  const { user } = useUserContext();
  const [imageUri, setImageUri] = useState("");
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (user.image) {
      setImageUri(user.image);
    } else {
      setImageUri(
        Image.resolveAssetSource(
          require("../../assets/images/default-profile-photo.jpg")
        ).uri
      );
    }
  }, [user.image]);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log out",
          onPress: () => router.replace("/"),
        },
      ],
      { cancelable: false }
    );
  };

  const CustomDrawerContent = (props) => (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: top }}
      >
        <View style={styles.profileContainer}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          )}
          <Text style={styles.profileName}>{user.username}</Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          labelStyle={{ marginLeft: -20 }}
          label={"Log out"}
          onPress={handleLogout}
          icon={({ color, size }) => (
            <Ionicons name="log-out" color={color} size={size} />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold", fontSize: 30 },
        headerTintColor: "#FF5C00",
        headerTitleAlign: "center",
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: "#fff",
        drawerActiveTintColor: "#FF5C00",
        drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Drawer.Screen
        name="(home)"
        options={{
          headerTitle: "Sporzvous",
          drawerLabel: "Homepage",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: "10%" }}
              onPress={() => router.push("drawer/(home)/(profile)")}
            >
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: "#FF5C00",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="(friends)"
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
        name="(myevents)"
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
          headerTitle: "Sporzvous",
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

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#FF5C00",
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Layout;
