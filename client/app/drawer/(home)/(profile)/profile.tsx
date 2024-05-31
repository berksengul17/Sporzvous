import Button from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import Rating from "@/components/Rating";
import { useUserContext } from "@/context/UserProvider";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";

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

  useEffect(() => {
    console.log(favoriteSport);
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (user.image) {
      setImageUri(user.image);
    }
  }, [user.image]);

  const inputStyle = isProfileEditable
    ? { ...styles.input, borderColor: "#FF5C00", color: "#FF5C00" }
    : styles.input;

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
                    imageUri ||
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
                value={gender}
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
                value={favoriteSport.toLowerCase()}
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
