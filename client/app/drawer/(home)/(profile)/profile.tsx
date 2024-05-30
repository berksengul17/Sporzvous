import React, { useState, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";
import RNPickerSelect from "react-native-picker-select";
import { useUserContext } from "@/context/UserProvider";
import Button from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import Rating from "@/components/Rating";
import { router } from "expo-router";

const Profile = () => {
  const { user, isProfileEditable, setProfileEditable, updateProfile } =
    useUserContext();

  const [username, setUsername] = useState(user.username);
  const [fullName, setFullName] = useState(user.fullName);
  const [age, setAge] = useState(user.age.toString());
  const [gender, setGender] = useState(user.gender);
  const [favoriteSport, setFavoriteSport] = useState(user.favoriteSport);
  const [imageUri, setImageUri] = useState("");
  const [userSkillByOthersField, setUserSkillByOthersField] = useState("");
  const [userSkillField, setUserSkillField] = useState("");
  const [overallField, setOverallField] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const inputStyle = isProfileEditable
    ? { ...styles.input, borderColor: "#FF5C00", color: "#FF5C00" }
    : styles.input;

  const getImageUri = () => {
    const documentBase64 = user.image;

    if (!documentBase64) {
      // Use the default image if user's image is not set
      setImageUri(
        Image.resolveAssetSource(
          require("../../../../assets/images/default-profile-photo.jpg")
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={{
                uri:
                  imageUri ||
                  Image.resolveAssetSource(
                    require("../../../../assets/images/default-profile-photo.jpg")
                  ).uri,
              }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
                borderWidth: 1,
              }}
            />
          </TouchableOpacity>
          <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
            <ImageViewer
              imageUrls={[
                {
                  url:
                    user.image ||
                    Image.resolveAssetSource(
                      require("../../../../assets/images/default-profile-photo.jpg")
                    ).uri,
                },
              ]}
            />
          </Modal>
          <View style={{ alignItems: "center" }}>
            <CustomText
              text="Verified"
              customStyle={{ alignSelf: "flex-start", marginBottom: 10 }}
            />
            <CustomText text="" customStyle={styles.headerRectangle} />
          </View>
          <View style={{ alignItems: "center" }}>
            <CustomText text="Event Count" customStyle={{ marginBottom: 10 }} />
            <CustomText text="107" customStyle={styles.headerRectangle} />
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Button
              title="Comments >"
              onPress={() => router.push("drawer/(home)/(profile)/comments")}
              containerStyle={{ paddingVertical: 7, paddingHorizontal: 4 }}
            />
          </View>
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <CustomText text="Username" customStyle={styles.label} />
            <TextInput
              value={username}
              onChangeText={setUsername}
              editable={isProfileEditable}
              style={inputStyle}
            />
          </View>
          <View style={styles.userInfo}>
            <CustomText text="Name/Surname" customStyle={styles.label} />
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              editable={isProfileEditable}
              style={inputStyle}
            />
          </View>
          <View style={styles.userInfo}>
            <CustomText text="Age" customStyle={styles.label} />
            <TextInput
              value={age}
              onChangeText={setAge}
              editable={isProfileEditable}
              style={inputStyle}
            />
          </View>
          <View style={styles.userInfo}>
            <CustomText text="Gender" customStyle={styles.label} />
            <View style={{ flex: 1 }}>
              <RNPickerSelect
                onValueChange={(newGender) => setGender(newGender)}
                items={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: inputStyle,
                  inputAndroid: inputStyle,
                }}
                disabled={!isProfileEditable}
                placeholder={{
                  label: "Select your gender...",
                  value: null,
                }}
              />
            </View>
          </View>
          <View style={styles.userInfo}>
            <CustomText text="Favorite Sport" customStyle={styles.label} />
            <View style={{ flex: 1 }}>
              <RNPickerSelect
                onValueChange={(newSport) => setFavoriteSport(newSport)}
                items={[
                  { label: "Basketball", value: "basketball" },
                  { label: "Football", value: "football" },
                ]}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: inputStyle,
                  inputAndroid: inputStyle,
                }}
                disabled={!isProfileEditable}
                placeholder={{
                  label: "Select your favorite sport...",
                  value: null,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ padding: 10, rowGap: 10 }}>
          <View style={styles.ratingContainer}>
            <CustomText
              text="User skills by others"
              customStyle={{ ...styles.label, width: "20%" }}
            />
            <View>
              <RNPickerSelect
                onValueChange={(field) => setUserSkillByOthersField(field)}
                items={[
                  { label: "Basketball", value: "basketball" },
                  { label: "Football", value: "football" },
                ]}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: styles.input,
                  inputAndroid: styles.input,
                  placeholder: { color: styles.input.color },
                }}
                placeholder={{
                  label: "Choose",
                  value: null,
                }}
              />
            </View>
            <Rating />
          </View>
          <View style={styles.ratingContainer}>
            <CustomText
              text="User skills"
              customStyle={{ ...styles.label, width: "20%" }}
            />
            <View>
              <RNPickerSelect
                onValueChange={(field) => setUserSkillField(field)}
                items={[
                  { label: "Basketball", value: "basketball" },
                  { label: "Football", value: "football" },
                ]}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: styles.input,
                  inputAndroid: styles.input,
                  placeholder: { color: styles.input.color },
                }}
                placeholder={{
                  label: "Choose",
                  value: null,
                }}
              />
            </View>
            <Rating />
          </View>
          <View style={styles.ratingContainer}>
            <CustomText
              text="Overall"
              customStyle={{ ...styles.label, width: "20%" }}
            />
            <View>
              <RNPickerSelect
                onValueChange={(field) => setOverallField(field)}
                items={[
                  { label: "Basketball", value: "basketball" },
                  { label: "Football", value: "football" },
                ]}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: styles.input,
                  inputAndroid: styles.input,
                  placeholder: { color: styles.input.color },
                }}
                placeholder={{
                  label: "Choose",
                  value: null,
                }}
              />
            </View>
            <Rating />
          </View>
          <View style={styles.ratingContainer}>
            <CustomText text="Organization skills" customStyle={styles.label} />
            <Rating />
          </View>
        </View>
        {isProfileEditable && (
          <Button
            title="Save"
            containerStyle={{
              margin: 15,
            }}
            onPress={() => {
              updateProfile({
                username,
                fullName,
                image: user.image || "",
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    shadowColor: "#000",
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
    backgroundColor: "#fff",
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
  field: {
    color: "#828282",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
