import Button from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import Rating from "@/components/Rating";
import { useUserContext } from "@/context/UserProvider";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

// TODO isEditable propu yollanıcak, updateProfile fonksiyonun nasıl çağrılacak
const Profile = ({ isEditable = true }: { isEditable: boolean }) => {
  const { user, updateProfile } = useUserContext();

  const [username, setUsername] = useState(user.username);
  const [fullName, setFullName] = useState(user.fullName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [favoriteSport, setFavoriteSport] = useState(user.favoriteSport);
  //TODO rating state ekle

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
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
            onPress={() => {}}
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
            editable={isEditable}
            style={styles.input}
          />
        </View>
        <View style={styles.userInfo}>
          <CustomText text="Name/Surname" customStyle={styles.label} />
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            editable={isEditable}
            style={styles.input}
          />
        </View>
        <View style={styles.userInfo}>
          <CustomText text="Age" customStyle={styles.label} />
          <TextInput
            value={age}
            onChangeText={setAge}
            editable={isEditable}
            style={styles.input}
          />
        </View>
        <View style={styles.userInfo}>
          <CustomText text="Gender" customStyle={styles.label} />
          <TextInput
            value={gender}
            onChangeText={setGender}
            editable={isEditable}
            style={styles.input}
          />
        </View>
        <View style={styles.userInfo}>
          <CustomText text="Favorite Sport" customStyle={styles.label} />
          <TextInput
            value={favoriteSport}
            onChangeText={setFavoriteSport}
            editable={isEditable}
            style={styles.input}
          />
        </View>
      </View>
      <View style={{ padding: 10, rowGap: 10 }}>
        <View style={styles.ratingContainer}>
          <CustomText
            text="User skills by others"
            customStyle={{ ...styles.label, width: "20%" }}
          />
          <CustomText text="Choose" customStyle={styles.field} />
          <Rating />
        </View>
        <View style={styles.ratingContainer}>
          <CustomText
            text="User skills"
            customStyle={{ ...styles.label, width: "20%" }}
          />
          <CustomText text="Football" customStyle={styles.field} />
          <Rating />
        </View>
        <View style={styles.ratingContainer}>
          <CustomText
            text="Overall"
            customStyle={{ ...styles.label, width: "20%" }}
          />
          <CustomText text="Football" customStyle={styles.field} />
          <Rating />
        </View>
        <View style={styles.ratingContainer}>
          <CustomText text="Organizaton skills" customStyle={styles.label} />
          <Rating />
        </View>
      </View>
    </View>
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
