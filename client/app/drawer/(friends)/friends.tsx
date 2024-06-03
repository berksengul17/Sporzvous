import CustomButton from "@/components/CustomButton";
import FriendList from "@/components/FriendList";
import { useUserContext } from "@/context/UserProvider";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useDarkMode } from "@/context/DarkModeContext"; // Adjust the import path as necessary
import { useTranslation } from "react-i18next"; // Import useTranslation
import Toast from "react-native-toast-message";

export default function FriendsScreen() {
  const { user } = useUserContext();
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation("friends"); // Initialize useTranslation

  const [searchText, setSearchText] = useState("");
  const [friendName, setFriendName] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorAddFriend, setErrorAddFriend] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const sendRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("senderUsername", user.username);
      formData.append("receiverUsername", friendName);
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/friendrequests/send`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setErrorAddFriend("");
      toggleModal();
      Toast.show({
        type: "error",
        text1: t("unexpectedError"),
        text2: "errorMessage",
        position: "bottom",
      });
      //setConfirmationMessage(t("sendRequestConfirm"));
      //setConfirmationModalVisible(true);
    } catch (err) {
      setErrorAddFriend(t("unexpectedError"));

      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.error) {
          setErrorAddFriend(err.response.data.error);
        } else if (err instanceof Error) {
          setErrorAddFriend(err.response?.data);
        }
      }

      Toast.show({
        type: "error",
        text1: t("unexpectedError"),
        text2: "errorMessage",
        position: "bottom",
      });
      //se
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "white" },
      ]}
    >
      <View style={styles.popUpContainer}>
        <Modal
          backdropColor={isDarkMode ? "#000" : "#6F6F6F"}
          animationIn={"tada"}
          animationOut={"fadeOut"}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={[
            styles.modal,
            { backgroundColor: isDarkMode ? "#333" : "white" },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.text,
                { color: isDarkMode ? "#FF5C00" : "#FF5C00" },
              ]}
            >
              {t("addFriend")}
            </Text>
            <TextInput
              value={friendName}
              onChangeText={setFriendName}
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? "#555" : "#F0F0F0",
                  color: isDarkMode ? "#fff" : "#000",
                },
              ]}
              placeholder={t("search")}
              placeholderTextColor={isDarkMode ? "#888" : "#6F6F6F"}
            />
            <View style={styles.buttons}>
              <CustomButton
                title={t("cancel")}
                onPress={toggleModal}
                containerStyle={{
                  width: 80,
                  backgroundColor: isDarkMode ? "#333" : "#fff",
                }}
                textStyle={{ color: isDarkMode ? "#fff" : "#FF5C00" }}
              />
              <CustomButton
                title={t("sendRequest")}
                onPress={sendRequest}
                containerStyle={{
                  width: 130,
                  backgroundColor: isDarkMode ? "#FF5C00" : "#FF5C00",
                }}
                textStyle={{ color: isDarkMode ? "#fff" : "#fff" }}
              />
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={isConfirmationModalVisible}
          onBackdropPress={() => setConfirmationModalVisible(false)}
        >
          <View
            style={[
              styles.confirmationModal,
              { backgroundColor: isDarkMode ? "#333" : "white" },
            ]}
          >
            <Text
              style={[
                styles.confirmationText,
                { color: isDarkMode ? "#FF5C00" : "#FF5C00" },
              ]}
            >
              {confirmationMessage}
            </Text>
            <CustomButton
              title="OK"
              onPress={() => setConfirmationModalVisible(false)}
              containerStyle={{ width: 80 }}
              textStyle={{ color: isDarkMode ? "#fff" : "#FF5C00" }}
            />
          </View>
        </Modal>
      </View>
      <View
        style={[
          styles.header,
          { backgroundColor: isDarkMode ? "#333" : "white" },
        ]}
      >
        <View
          style={[
            styles.searchBar,
            { backgroundColor: isDarkMode ? "#555" : "#F0F0F0" },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={isDarkMode ? "#888" : "#6F6F6F"}
          />
          <TextInput
            style={[
              styles.searchText,
              { color: isDarkMode ? "#fff" : "#6F6F6F" },
            ]}
            placeholder={t("search")}
            placeholderTextColor={isDarkMode ? "#888" : "#6F6F6F"}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={{ marginLeft: "1%" }}>
          <MaterialCommunityIcons
            name="email-send"
            size={45}
            color="#FF5C00"
            onPress={() => router.push("/drawer/(friends)/friendRequests")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: "1%" }}>
          <AntDesign
            name="adduser"
            size={42}
            color="#FF5C00"
            onPress={toggleModal}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.friendListContainer,
          { backgroundColor: isDarkMode ? "#000" : "white" },
        ]}
      >
        <FriendList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingHorizontal: 10,
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderRadius: 25,
    flex: 1,
  },
  searchText: {
    marginLeft: 10,
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  popUpContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    marginTop: "60%",
    marginBottom: "100%",
    marginLeft: "12%",
    marginRight: "12%",
    borderRadius: 20,
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  friendListContainer: {
    flex: 1,
  },
  confirmationModal: {
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
