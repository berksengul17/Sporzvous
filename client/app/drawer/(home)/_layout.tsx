import { useUserContext } from "@/context/UserProvider";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image } from "react-native";

export const unstable_settings = {
  initialRouteName: "join_event",
};

const _layout = () => {
  const { user, isProfileEditable, setProfileEditable } = useUserContext();
  const [imageUri, setImageUri] = useState("");

  const getImageUri = () => {
    const documentBase64 = user.image;

    const isValidBase64 = (str: string) => {
      if (typeof str !== "string") {
        return false;
      }
      const base64Pattern = /^[A-Za-z0-9+/=]+$/;
      const paddingPattern = /^(?:.{4})*(?:.{2}==|.{3}=)?$/;
      return base64Pattern.test(str) && paddingPattern.test(str);
    };

    if (!documentBase64 || !isValidBase64(documentBase64)) {
      // Use the default image if user's image is not set
      setImageUri(
        Image.resolveAssetSource(
          require("../../../assets/images/default-profile-photo.jpg")
        ).uri
      );
      return;
    }

    // Decode the Base64 string to binary
    const binaryString = window.atob(documentBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the binary data
    const imageBlob = new Blob([bytes], { type: "image/jpeg" });

    // Generate a URL for the Blob
    const imageUrl = URL.createObjectURL(imageBlob);

    setImageUri(imageUrl);
  };

  useEffect(() => {
    getImageUri();
  }, [user.image]);

  return (
    <Stack>
      <Stack.Screen name="sportsScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          presentation: "fullScreenModal",
          headerTitle: "Sporzvous",
          headerTitleStyle: { color: "#FF5C00", fontWeight: "bold" },
          headerLeft: () => (
            <Entypo
              name="cross"
              onPress={() => router.back()}
              size={30}
              color={"#FF5C00"}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("drawer/(home)/(profile)")}
            >
              <Image
                source={{
                  uri:
                    imageUri ||
                    Image.resolveAssetSource(
                      require("../../../assets/images/default-profile-photo.jpg")
                    ).uri,
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  borderWidth: 1,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="createEventModal"
        options={{
          presentation: "fullScreenModal",
          headerTitle: "Create a new event",
          headerTitleStyle: { color: "#FF5C00", fontWeight: "bold" },
          headerLeft: () => (
            <Entypo
              name="cross"
              onPress={() => router.back()}
              size={30}
              color={"#FF5C00"}
            />
          ),
        }}
      />
      <Stack.Screen
        name="filterModal"
        options={{
          presentation: "modal",
          headerTitle: "Filter",
          headerTitleStyle: { color: "#FF5C00", fontWeight: "bold" },
          headerLeft: () => (
            <Entypo
              name="cross"
              onPress={() => router.back()}
              size={30}
              color={"#FF5C00"}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(profile)"
        options={{
          presentation: "modal",
          headerTitle: "Profile",
          headerTitleStyle: { color: "#FF5C00", fontWeight: "bold" },
          headerLeft: () => (
            <Entypo
              name="cross"
              onPress={() => router.back()}
              size={30}
              color={"#FF5C00"}
            />
          ),
          headerRight: () => (
            <FontAwesome
              name="pencil-square-o"
              size={30}
              color={isProfileEditable ? "#FF5C00" : "#6F6F6F"}
              onPress={() => {
                setProfileEditable(!isProfileEditable);
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="join_event"
        options={{
          presentation: "modal",
          headerTitle: "Join Event",
          headerTitleStyle: { color: "#FF5C00", fontWeight: "bold" },
          headerLeft: () => (
            <Entypo
              name="cross"
              onPress={() => router.back()}
              size={30}
              color={"#FF5C00"}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;
