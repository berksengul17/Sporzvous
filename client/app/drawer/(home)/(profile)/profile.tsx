import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ImageViewing from "react-native-image-viewing";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import Button from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import Rating from "@/components/Rating";
import { Rating as RatingType, useUserContext } from "@/context/UserProvider";
import { useDarkMode } from "@/context/DarkModeContext"; // Ensure this is the correct path to your DarkModeContext
import { router } from "expo-router";

const initialSportsData = [
  { id: "1", label: "Basketball", value: "basketball" },
  { id: "2", label: "Football", value: "football" },
  { id: "3", label: "Volleyball", value: "volleyball" },
  { id: "4", label: "Tennis", value: "tennis" },
  { id: "5", label: "Baseball", value: "baseball" },
  { id: "6", label: "Badminton", value: "badminton" },
  { id: "7", label: "Handball", value: "handball" },
  { id: "8", label: "Ice Hockey", value: "ice_hockey" }, // Corrected value
  { id: "9", label: "Paintball", value: "paintball" }, // Corrected value
];

const Profile = () => {
  const { user, isProfileEditable, setProfileEditable, updateProfile } =
    useUserContext();
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation("profile");

  const [username, setUsername] = useState(user.username);
  const [fullName, setFullName] = useState(user.fullName);
  const [age, setAge] = useState(user.age.toString());
  const [gender, setGender] = useState(user.gender);
  const [favoriteSport, setFavoriteSport] = useState(user.favoriteSport);
  const [imageUri, setImageUri] = useState(user.image || "");
  const [userSkillByOthersField, setUserSkillByOthersField] = useState("");
  const [userSkillField, setUserSkillField] = useState("");
  const [overallField, setOverallField] = useState("");
  const [isImageViewerVisible, setImageViewerVisible] = useState(false);
  const [isImageSourceModalVisible, setImageSourceModalVisible] =
    useState(false);

  useEffect(() => {
    if (user.image) {
      setImageUri(user.image);
    }
  }, [user.image]);

  const handleImagePick = async (source) => {
    let result;
    if (source === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert(t("cameraPermission"));
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
        alert(t("galleryPermission"));
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
      setImageUri(base64Image);
    }
    setImageSourceModalVisible(false);
  };

  const inputStyle = isProfileEditable
    ? { ...styles.input, borderColor: "#FF5C00", color: "#FF5C00" }
    : styles.input;

  const selectedRating =
    user.ratings.find((rating) => {
      return (
        rating.sportName.toLowerCase().replace(/ /g, "_") === userSkillField
      );
    })?.rating || 0;

  console.log("Selected rating for field:", userSkillField, selectedRating); // Debugging output

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#333" : "white" },
        ]}
      >
        <View
          style={[
            styles.header,
            { borderBottomColor: isDarkMode ? "#333" : "#E0E0E0" },
          ]}
        >
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => setImageViewerVisible(true)}>
              <Image
                source={{
                  uri:
                    imageUri ||
                    Image.resolveAssetSource(
                      require("../../../../assets/images/default-profile-photo.jpg")
                    ).uri,
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {isProfileEditable && (
              <TouchableOpacity
                style={styles.cameraIconContainer}
                onPress={() => setImageSourceModalVisible(true)}
              >
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          <ImageViewing
            images={[
              {
                uri:
                  imageUri ||
                  Image.resolveAssetSource(
                    require("../../../../assets/images/default-profile-photo.jpg")
                  ).uri,
              },
            ]}
            imageIndex={0}
            visible={isImageViewerVisible}
            onRequestClose={() => setImageViewerVisible(false)}
          />
          <Modal
            animationIn="fadeIn"
            isVisible={isImageSourceModalVisible}
            customBackdrop={
              <TouchableWithoutFeedback
                onPress={() => setImageSourceModalVisible(false)}
              >
                <View
                  style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                />
              </TouchableWithoutFeedback>
            }
          >
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: isDarkMode ? "#333" : "white" },
              ]}
            >
              <View
                style={[
                  styles.modalView,
                  { backgroundColor: isDarkMode ? "#333" : "white" },
                ]}
              >
                <Text
                  style={[
                    styles.modalTitle,
                    { color: isDarkMode ? "#fff" : "#333" },
                  ]}
                >
                  {t("selectImageSource")}
                </Text>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleImagePick("camera")}
                >
                  <Ionicons name="camera" size={24} color="#FF5C00" />
                  <Text
                    style={[
                      styles.modalOptionText,
                      { color: isDarkMode ? "#fff" : "#333" },
                    ]}
                  >
                    {t("takePhoto")}
                  </Text>
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
                  <Text
                    style={[
                      styles.modalOptionText,
                      { color: isDarkMode ? "#fff" : "#333" },
                    ]}
                  >
                    {t("chooseFromGallery")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => setImageSourceModalVisible(false)}
                >
                  <Ionicons name="arrow-back" size={24} color="#FF5C00" />
                  <Text
                    style={[
                      styles.modalOptionText,
                      { color: isDarkMode ? "#fff" : "#333" },
                    ]}
                  >
                    {t("cancel")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{ alignItems: "center" }}>
            <CustomText
              text={t("verified")}
              customStyle={[
                { alignSelf: "flex-start", marginBottom: 10 },
                { color: isDarkMode ? "#fff" : "#333" },
              ]}
            />
            <CustomText text="" customStyle={styles.headerRectangle} />
          </View>
          <View style={{ alignItems: "center" }}>
            <CustomText
              text={t("eventCount")}
              customStyle={[
                { marginBottom: 10 },
                { color: isDarkMode ? "#fff" : "#333" },
              ]}
            />
            <CustomText
              text="107"
              customStyle={[
                styles.headerRectangle,
                { color: isDarkMode ? "#fff" : "#333" },
              ]}
            />
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Button
              title={`${t("comments")} >`}
              onPress={() => router.push("drawer/(home)/(profile)/comments")}
              containerStyle={{ paddingVertical: 7, paddingHorizontal: 4 }}
            />
          </View>
        </View>
        <View
          style={[
            styles.userInfoContainer,
            { backgroundColor: isDarkMode ? "#333" : "white" },
          ]}
        >
          <View style={styles.userInfo}>
            <CustomText
              text={t("username")}
              customStyle={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#6F6F6F" },
              ]}
            />
            <TextInput
              value={username}
              onChangeText={setUsername}
              editable={isProfileEditable}
              style={[
                inputStyle,
                {
                  backgroundColor: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#333",
                },
              ]}
            />
          </View>
          <View style={styles.userInfo}>
            <CustomText
              text={t("nameSurname")}
              customStyle={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#6F6F6F" },
              ]}
            />
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              editable={isProfileEditable}
              style={[
                inputStyle,
                {
                  backgroundColor: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#333",
                },
              ]}
            />
          </View>
          <View style={styles.userInfo}>
            <CustomText
              text={t("age")}
              customStyle={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#6F6F6F" },
              ]}
            />
            <TextInput
              value={age}
              onChangeText={setAge}
              editable={isProfileEditable}
              style={[
                inputStyle,
                {
                  backgroundColor: isDarkMode ? "#333" : "#fff",
                  color: isDarkMode ? "#fff" : "#333",
                },
              ]}
            />
          </View>
          <View style={styles.userInfo}>
            <CustomText
              text={t("gender")}
              customStyle={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#6F6F6F" },
              ]}
            />
            <View style={{ flex: 1 }}>
              <RNPickerSelect
                value={gender}
                onValueChange={(newGender) => setGender(newGender)}
                items={[
                  { label: t("male"), value: "male" },
                  { label: t("female"), value: "female" },
                ]}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: [
                    inputStyle,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                  inputAndroid: [
                    inputStyle,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                }}
                disabled={!isProfileEditable}
                placeholder={{
                  label: t("selectGender"),
                  value: null,
                }}
              />
            </View>
          </View>
          <View style={styles.userInfo}>
            <CustomText
              text={t("favoriteSport")}
              customStyle={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#6F6F6F" },
              ]}
            />
            <View style={{ flex: 1 }}>
              <RNPickerSelect
                value={favoriteSport.toLowerCase()}
                onValueChange={(newSport) => setFavoriteSport(newSport)}
                items={initialSportsData.map((sport) => ({
                  label: sport.label,
                  value: sport.value,
                }))}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: [
                    inputStyle,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                  inputAndroid: [
                    inputStyle,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                }}
                disabled={!isProfileEditable}
                placeholder={{
                  label: t("selectFavoriteSport"),
                  value: null,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ padding: 10, rowGap: 10 }}>
          <View style={styles.ratingContainer}>
            <CustomText
              text={t("userSkillsByOthers")}
              customStyle={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#6F6F6F", width: "20%" },
              ]}
            />
            <View>
              <RNPickerSelect
                onValueChange={(field) => setUserSkillByOthersField(field)}
                items={initialSportsData.map((sport) => ({
                  label: sport.label,
                  value: sport.value,
                }))}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: [
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                  inputAndroid: [
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                  placeholder: { color: styles.input.color },
                }}
                placeholder={{
                  label: t("choose"),
                  value: null,
                }}
              />
            </View>
            <Rating />
          </View>
          <View style={styles.ratingContainer}>
            <CustomText
              text={t("userSkills")}
              customStyle={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#6F6F6F", width: "20%" },
              ]}
            />
            <View>
              <RNPickerSelect
                onValueChange={(field) => setUserSkillField(field)}
                items={initialSportsData.map((sport) => ({
                  label: sport.label,
                  value: sport.value,
                }))}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: [
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                  inputAndroid: [
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                  placeholder: { color: styles.input.color },
                }}
                placeholder={{
                  label: t("choose"),
                  value: null,
                }}
              />
            </View>
            <Rating value={selectedRating} isEditable={false} />
          </View>
          <View style={styles.ratingContainer}>
            <CustomText
              text={t("overall")}
              customStyle={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#6F6F6F", width: "20%" },
              ]}
            />
            <View>
              <RNPickerSelect
                onValueChange={(field) => setOverallField(field)}
                items={initialSportsData.map((sport) => ({
                  label: sport.label,
                  value: sport.value,
                }))}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: [
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                  inputAndroid: [
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                    },
                  ],
                  placeholder: { color: styles.input.color },
                }}
                placeholder={{
                  label: t("choose"),
                  value: null,
                }}
              />
            </View>
            <Rating />
          </View>
          <View style={styles.ratingContainer}>
            <CustomText
              text={t("organizationSkills")}
              customStyle={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#6F6F6F" },
              ]}
            />
            <Rating />
          </View>
        </View>
        {isProfileEditable && (
          <Button
            title={t("save")}
            containerStyle={{
              margin: 15,
            }}
            onPress={() => {
              updateProfile({
                username,
                fullName,
                image: imageUri,
                age: parseInt(age),
                gender,
                favoriteSport,
              });
              setProfileEditable(false);
            }}
          />
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderBottomWidth: 1,
  },
  headerRectangle: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "black",
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  userInfoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  label: {
    color: "#6F6F6F",
    width: "35%",
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#828282",
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35, // Circular shape
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#FF5C00",
    borderRadius: 12,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
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
});
