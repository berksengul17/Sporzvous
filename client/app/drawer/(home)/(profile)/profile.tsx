import Button from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import Rating from "@/components/Rating";
import { useUserContext } from "@/context/UserProvider";
import RNPickerSelect from "react-native-picker-select"; // Import the Picker

import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// TODO isEditable propu yollanıcak, updateProfile fonksiyonun nasıl çağrılacak
const Profile = () => {
  const { user, isProfileEditable, setProfileEditable, updateProfile } =
    useUserContext();

  const [username, setUsername] = useState<string>(user.username);
  const [fullName, setFullName] = useState<string>(user.fullName);
  const [age, setAge] = useState<string>(user.age.toString());
  const [gender, setGender] = useState<string>(user.gender);
  const [favoriteSport, setFavoriteSport] = useState<string>(
    user.favoriteSport
  );

  const [userSkillByOthersField, setUserSkillByOthersField] =
    useState<string>("");
  const [userSkillField, setUserSkillField] = useState<string>("");
  const [overallField, setOverallField] = useState<string>("");

  //TODO rating state ekle

  const inputStyle = isProfileEditable
    ? { ...styles.input, borderColor: "#FF5C00", color: "#FF5C00" }
    : styles.input;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={styles.header}>
          <CustomText
            text=""
            customStyle={{
              borderWidth: 1,
              width: 60,
              height: 60,
              borderRadius: 100,
              alignSelf: "flex-end",
            }}
          />
          <View style={{ alignItems: "center" }}>
            <CustomText
              text="Verified"
              customStyle={{ alignSelf: "flex-start", marginBottom: 10 }}
            />
            {/* <AntDesign name="checksquareo" size={40} color="black" /> */}
            <CustomText
              text=""
              customStyle={{ borderWidth: 1, width: 40, height: 40 }}
            />
          </View>
          {/* TODO - add space between title and value */}
          <View
            style={{
              alignItems: "center",
            }}
          >
            <CustomText text="Event Count" customStyle={{ marginBottom: 10 }} />
            <CustomText text="107" customStyle={styles.input} />
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
            <CustomText text="Organizaton skills" customStyle={styles.label} />
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
    margin: 10,
  },
  userInfoContainer: {
    // TODO padding artabilir
    paddingHorizontal: 10,
    paddingVertical: 20,
    rowGap: 10,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#6F6F6F",
    width: "35%",
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
