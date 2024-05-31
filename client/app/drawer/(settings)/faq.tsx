import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDarkMode } from "@/context/DarkModeContext";
import { useTranslation } from "react-i18next";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation("faq");

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = t("faqs", { returnObjects: true });

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
