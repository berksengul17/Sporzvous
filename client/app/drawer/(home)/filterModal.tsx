import CustomText from "@/components/CustomText";
import { useDarkMode } from "@/context/DarkModeContext";
import { useEventContext } from "@/context/EventProvider";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const dateOptions = ["All", "Today", "This Week", "This Month"];
const ratingOptions = [
  { label: "All", minRating: 0 },
  { label: "★ 4 and above", minRating: 4 },
  { label: "★ 3 and above", minRating: 3 },
  { label: "★ 2 and above", minRating: 2 },
  { label: "★ 1 and above", minRating: 1 },
];

const Page = () => {
  const { filterEvents, filter, setFilter, events } = useEventContext();
  const [cities, setCities] = useState([]);
  const [villages, setVillages] = useState([]);
  const [locationCity, setLocationCity] = useState<string>("");
  const [locationVillage, setLocationVillage] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const { t } = useTranslation("filterEvents");
  const { isDarkMode } = useDarkMode();

  const applyFilters = async () => {
    setFilter({ ...filter, locationCity, locationDistrict: locationVillage });
    await filterEvents();
    router.back();
  };

  useEffect(() => {
    axios
      .get(
        `http://api.geonames.org/searchJSON?username=emreerol0&country=TR&featureClass=P&maxRows=83`
      )
      .then((response) => {
        const cityList = response.data.geonames.map((city: any) => ({
          label: city.name,
          value: city.name,
        }));
        setCities(cityList);
        setLocationVillage("");
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const fetchVillages = (city: string) => {
    axios
      .get(
        `http://api.geonames.org/searchJSON?username=emreerol0&q=${city}&maxRows=60&featureClass=P`
      )
      .then((response) => {
        const villageList = response.data.geonames.map((village: any) => ({
          label: village.name,
          value: village.name,
        }));
        setVillages(villageList);
      })
      .catch((error) => {
        console.error("Error fetching villages:", error);
      });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isDarkMode ? "#333" : "#fff" }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#333" : "#fff" },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setFilter({
              ...filter,
              locationCity: null,
              locationDistrict: null,
              date: "All",
              rating: 0,
            });
          }}
        >
          <CustomText customStyle={styles.clearText} text={t("clearFilters")} />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <CustomText
            customStyle={[
              styles.sectionTitle,
              { color: isDarkMode ? "#fff" : "#47315a" },
            ]}
            text={t("location")}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={(city) => {
              setLocationCity(city);
              setSelectedCity(city);
              fetchVillages(city);
            }}
            items={cities}
            placeholder={{
              label: t("city"),
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputAndroid: [
                styles.pickerStyles,
                isDarkMode && styles.darkModePicker,
              ],
              inputIOS: [
                styles.pickerStyles,
                isDarkMode && styles.darkModePicker,
              ],
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={setLocationVillage}
            items={villages}
            placeholder={{
              label: t("village"),
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputAndroid: [
                styles.pickerStyles,
                isDarkMode && styles.darkModePicker,
              ],
              inputIOS: [
                styles.pickerStyles,
                isDarkMode && styles.darkModePicker,
              ],
            }}
            disabled={!selectedCity}
          />
        </View>
        <View style={[styles.titleWrapper, { marginTop: 20 }]}>
          <CustomText
            customStyle={[
              styles.sectionTitle,
              { color: isDarkMode ? "#fff" : "#47315a" },
            ]}
            text={t("date")}
          />
        </View>
        <View style={styles.buttonContainer}>
          {dateOptions.map((date) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.button,
                filter.date === date && styles.buttonSelected,
              ]}
              onPress={() => setFilter({ ...filter, date })}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: isDarkMode ? "#fff" : "#47315a" },
                  filter.date === date && styles.buttonTextSelected,
                ]}
              >
                {t(`dates.${date}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.titleWrapper}>
          <CustomText
            customStyle={{
              ...styles.sectionTitle,
              color: isDarkMode ? "#fff" : "#47315a",
            }}
            text={t("rating")}
          />
        </View>
        <View style={styles.buttonContainer}>
          {ratingOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.button,

                filter.rating === option.minRating && styles.buttonSelected,
              ]}
              onPress={() => setFilter({ ...filter, rating: option.minRating })}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: isDarkMode ? "#fff" : "#47315a" },
                  filter.rating === option.minRating &&
                    styles.buttonTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>{t("apply")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
  },
  clearText: {
    color: "#FF5C00",
    fontSize: 16,
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: "#47315a",
  },
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#47315a",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonSelected: {
    backgroundColor: "#FF5C00",
    borderColor: "#FF5C00",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  buttonTextSelected: {
    fontSize: 14,
    color: "white",
  },
  pickerStyles: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    color: "black",
    fontFamily: Platform.select({
      android: "OpenSans_400Regular",
      ios: "OpenSans-Regular",
    }),
  },
  darkModePicker: {
    borderColor: "#424242",
    color: "white",
  },
  applyButton: {
    backgroundColor: "#FF5C00",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "50%", // Sets the button width to half of its container width
    alignSelf: "center", // Centers the button horizontally within the ScrollView
    marginTop: 20, // Optional: adds space above the button
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: "#6F6F6F",
    borderRadius: 8,
    color: "black",
    marginBottom: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Page;
