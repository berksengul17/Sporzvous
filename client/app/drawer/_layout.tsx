import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

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
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "@/context/UserProvider";
import { useRouter } from "expo-router";
import { useDarkMode } from "@/context/DarkModeContext"; // Adjust the import path as necessary
import { useTranslation } from "react-i18next";

export const unstable_settings = {
  initialRouteName: "(home)",
};

const Layout = () => {
  const { user, logout } = useUserContext();
  const [imageUri, setImageUri] = useState("");
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { t } = useTranslation();

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
      t("confirmLogout"),
      t("logoutMessage"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("logout"),
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
        contentContainerStyle={{
          paddingTop: top,
          backgroundColor: isDarkMode ? "#333" : "#fff",
        }}
      >
        <View style={styles.profileContainer}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          )}
          <Text
            style={[
              styles.profileName,
              { color: isDarkMode ? "#fff" : "#333" },
            ]}
          >
            {user.username}
          </Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          labelStyle={{ marginLeft: -20, color: isDarkMode ? "#fff" : "#000" }}
          label={t("logout")}
          onPress={handleLogout}
          icon={({ color, size }) => (
            <Ionicons
              name="log-out"
              color={isDarkMode ? "#fff" : color}
              size={size}
            />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 30,
          color: "#FF5C00",
        },
        headerTintColor: "#FF5C00",
        headerTitleAlign: "center",
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: "#FF5C00",
        drawerActiveTintColor: isDarkMode ? "#000" : "#fff",
        drawerLabelStyle: {
          marginLeft: -20,
          color: isDarkMode ? "#fff" : "#000",
        },
        drawerStyle: {
          backgroundColor: isDarkMode ? "#333" : "#fff",
        },
        headerStyle: {
          backgroundColor: isDarkMode ? "#333" : "#fff",
        },
        drawerIcon: ({ size, color }) => (
          <Ionicons
            name="log-out"
            size={size}
            color={isDarkMode ? "#fff" : color}
          />
        ),
      }}
    >
      <Drawer.Screen
        name="(home)"
        options={{
          headerTitle: "Sporzvous",
          drawerLabel: t("home"),
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="home"
              size={size}
              color={isDarkMode ? "#fff" : color}
            />
          ),
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: "10%" }}
              onPress={() => router.push("drawer/(home)/(profile)")}
            >
              {imageUri && (
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
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="(friends)"
        options={{
          headerTitle: t("friends"),
          drawerLabel: t("friends"),
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="people"
              size={size}
              color={isDarkMode ? "#fff" : color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="inbox"
        options={{
          headerTitle: t("inbox"),
          drawerLabel: t("inbox"),
          drawerIcon: ({ size, color }) => (
            <FontAwesome
              name="envelope-o"
              size={size}
              color={isDarkMode ? "#fff" : color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="(myevents)"
        options={{
          headerTitle: t("myEvents"),
          drawerLabel: t("myEvents"),
          drawerIcon: ({ size, color }) => (
            <MaterialIcons
              name="event"
              size={size}
              color={isDarkMode ? "#fff" : color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="complaint"
        options={{
          headerTitle: t("complaint"),
          drawerLabel: t("complaint"),
          drawerIcon: ({ size, color }) => (
            <FontAwesome
              name="warning"
              size={size}
              color={isDarkMode ? "#fff" : color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="(settings)"
        options={{
          headerTitle: t("settings"),
          drawerLabel: t("settings"),
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="settings"
              size={size}
              color={isDarkMode ? "#fff" : color}
            />
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
  },
});

export default Layout;
