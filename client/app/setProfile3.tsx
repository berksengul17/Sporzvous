import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/context/UserProvider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const StepThree = () => {
  const { user, updateProfile } = useUserContext();
  const [profileImage, setProfileImage] = useState<string>(
    user.image ||
      Image.resolveAssetSource(require("../assets/images/defaultpp.jpg")).uri
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const handleImagePick = async (source: "camera" | "gallery") => {
    let result;
    if (source === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
    }

    if (!result.canceled && result.assets.length > 0) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setProfileImage(base64Image);
    }
    setModalVisible(false);
  };

  const handleNext = async () => {
    await updateProfile({ ...user, image: profileImage });
    router.navigate("setProfile4");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/images/sporzvouswp.png")}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Upload Your Profile Picture</Text>
            </View>
            <View style={styles.imagePickerContainer}>
              <TouchableOpacity
                style={styles.imagePicker}
                onPress={() => setImageModalVisible(true)}
              >
                <Image
                  source={
                    profileImage
                      ? { uri: profileImage }
                      : require("../assets/images/defaultpp.jpg")
                  }
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraIconContainer}
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                title="<"
                onPress={() => router.back()}
                containerStyle={styles.button}
              />
              <CustomButton
                title=">"
                onPress={handleNext}
                containerStyle={styles.button}
              />
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Select Image Source</Text>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleImagePick("camera")}
                >
                  <Ionicons name="camera" size={24} color="#FF5C00" />
                  <Text style={styles.modalOptionText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleImagePick("gallery")}
                >
                  <MaterialIcons
                    name="photo-library"
                    size={24}
                    color="#FF5C00"
                  />
                  <Text style={styles.modalOptionText}>
                    Choose from Gallery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="arrow-back" size={24} color="#FF5C00" />
                  <Text style={styles.modalOptionText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={imageModalVisible}
            onRequestClose={() => setImageModalVisible(false)}
          >
            <View style={styles.imageModalContainer}>
              <TouchableOpacity
                style={styles.imageModalBackground}
                onPress={() => setImageModalVisible(false)}
              >
                <Image
                  source={{ uri: profileImage }}
                  style={styles.imageModal}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
    width: "80%",
    height: "52%",
    justifyContent: "space-between",
    position: "relative",
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#FF5C00",
    fontWeight: "bold",
    textAlign: "center",
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF5C00",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
    resizeMode: "cover",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#FF5C00",
    borderRadius: 12,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#FF5C00",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF5C00",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  modalOptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#FF5C00",
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  imageModalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageModal: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
});

export default StepThree;
