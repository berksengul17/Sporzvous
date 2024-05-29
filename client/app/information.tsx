import React from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import AuthHeader from "@/components/AuthHeader";
import CustomText from "@/components/CustomText";

const InformationScreen = () => {
  return (
    <View style={styles.overlay}>
      <ImageBackground
        source={require("../assets/images/sporzvouswp.png")}
        style={styles.background}
        imageStyle={{ opacity: 0.3 }} // Adjust the opacity here
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.authHeader}>
              <AuthHeader />
            </View>
            <CustomText
              customStyle={styles.header}
              text="Welcome to Sporzvous!"
              isBold={true}
            />
            <CustomText
              customStyle={styles.paragraph}
              text="Step into the world of Sporzvous, where your passion for sports
              meets cutting-edge technology! Our app is designed to bring sports
              enthusiasts together, offering a dynamic platform to create, join,
              and participate in a wide range of sports events. Experience
              seamless interaction, robust event management, and a thriving
              community of like-minded individuals, all at your fingertips."
            />
            <CustomText
              customStyle={styles.header}
              text="Features:"
              isBold={true}
            />
            <CustomText
              customStyle={styles.listItem}
              text="• Users can create or join existing events for a variety of sports."
            />
            <CustomText
              customStyle={styles.listItem}
              text="• Users can rate others based on their performance in events."
            />
            <CustomText
              customStyle={styles.listItem}
              text="• Users must join events if they want to participate. Bad intentions will be punished upon reports of other users."
            />
            <CustomText
              customStyle={styles.listItem}
              text="• Duration of events is determined by the organizer. Ratings are available when events are finished."
            />
            <CustomText
              customStyle={styles.listItem}
              text="• Users can organize events with players of similar skill levels, ensuring balanced and enjoyable matches."
            />
            <CustomText
              customStyle={styles.header}
              text="Community Guidelines:"
              isBold={true}
            />
            <CustomText
              customStyle={styles.paragraph}
              text="We prioritize respect and courtesy within our community. When using the in-app chat feature, please adhere to our general courtesy rules. Always communicate respectfully and uphold the spirit of sportsmanship. Users who do not follow these guidelines will be banned upon receiving reports from other users."
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                title="OK, got it!"
                onPress={() => router.replace("setProfile")}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    margin: 20,
    marginTop: 60, // Lower the container a little
    justifyContent: "center",
    alignItems: "center",
  },
  authHeader: {
    marginBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 18,
    color: "#555",
    marginBottom: 15,
    textAlign: "center",
  },
  listItem: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default InformationScreen;
