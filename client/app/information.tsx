import React from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import AuthHeader from "@/components/AuthHeader";
import CustomText from "@/components/CustomText";
import { useTranslation } from "react-i18next";

const InformationScreen = () => {
  const { t } = useTranslation("information");

  return (
    <View style={styles.overlay}>
      <ImageBackground
        source={require("../assets/images/sporzvouswp.png")}
        style={styles.background}
        imageStyle={{ opacity: 0.3 }}
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
              text={t("welcome")}
              isBold={true}
            />
            <CustomText
              customStyle={styles.paragraph}
              text={t("welcome_description")}
            />
            <CustomText
              customStyle={styles.header}
              text={t("features")}
              isBold={true}
            />
            <CustomText
              customStyle={styles.listItem}
              text={t("feature_create_join_events")}
            />
            <CustomText
              customStyle={styles.listItem}
              text={t("feature_rate_others")}
            />
            <CustomText
              customStyle={styles.listItem}
              text={t("feature_must_join")}
            />
            <CustomText
              customStyle={styles.listItem}
              text={t("feature_event_duration")}
            />
            <CustomText
              customStyle={styles.listItem}
              text={t("feature_organize_events")}
            />
            <CustomText
              customStyle={styles.header}
              text={t("community_guidelines")}
              isBold={true}
            />
            <CustomText
              customStyle={styles.paragraph}
              text={t("guidelines_description")}
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                title={t("ok_got_it")}
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
    marginTop: 60,
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
