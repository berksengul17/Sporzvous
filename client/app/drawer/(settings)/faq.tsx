import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDarkMode } from "@/context/DarkModeContext"; // Adjust the import path as necessary

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { isDarkMode } = useDarkMode();

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Sporzvous?",
      answer:
        "Sporzvous is a mobile app that connects sports enthusiasts with events and organizations. It enables users to discover and participate in sports activities, track their involvement, and rate their skills in various sports.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account on Sporzvous, download the app from the App Store or Google Play. Open the app and tap the 'Sign Up' button. Follow the prompts to enter your email, set a password, and complete your profile details.",
    },
    {
      question: "How can I find sports activities?",
      answer:
        "You can find sports activities on the homepage. Browse the sports cards displayed, and tap on a card to view the events associated with that sport. Select an event to see more details and join.",
    },
    {
      question: "How do I rate my skills in a sport?",
      answer:
        "To rate your skills, go to your profile and tap the edit button at the top right corner. Choose a sport and use the star rating component to select a rating from 1 to 5 stars. This helps others understand your skill level in various sports.",
    },
    {
      question: "Can I create my own sports event?",
      answer:
        "Yes, you can create your own sports event by tapping the 'Create Event' button at the top section of the homepage. Fill in the event details such as sport type, location, date, and time, and publish the event. Other users will be able to see and join your event.",
    },
    {
      question: "Is there a fee to use Sporzvous?",
      answer:
        "Sporzvous is free to download and use. While the basic functionalities are free, some events or premium features may have associated costs.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "If you need assistance, you can submit a complaint through the 'Complaints' page accessible from the app drawer. Fill out the form with your query, and our support team will respond as soon as possible.",
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "white" },
      ]}
    >
      {faqs.map((faq, index) => (
        <View key={index} style={styles.accordionItem}>
          <TouchableOpacity
            onPress={() => toggleAccordion(index)}
            style={styles.accordionHeader}
          >
            <Text
              style={[
                styles.accordionHeaderText,
                { color: isDarkMode ? "#fff" : "#333" },
              ]}
            >
              {faq.question}
            </Text>
            <MaterialIcons
              name={activeIndex === index ? "expand-less" : "expand-more"}
              size={24}
              color={"#FF5C00"}
            />
          </TouchableOpacity>
          {activeIndex === index && (
            <View style={styles.accordionContent}>
              <Text
                style={[
                  styles.accordionContentText,
                  { color: isDarkMode ? "#ccc" : "#666" },
                ]}
              >
                {faq.answer}
              </Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  accordionItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  accordionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accordionContent: {
    paddingVertical: 15,
  },
  accordionContentText: {
    fontSize: 14,
  },
});

export default FAQPage;
