import CustomText from "@/components/CustomText";
import { User, useUserContext } from "@/context/UserProvider";
import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export type Feedback = {
  feedbackId: number;
  reporter: User;
  content: string;
  category: string;
  reportedUsername: String;
};

type CreateFeedback = Omit<Feedback, "feedbackId">;

export default function FeedbacksHomePage() {
  const [category, setCategory] = useState("Category");
  const [content, setContent] = useState("");
  const [reportedUser, setReportedUser] = useState("");
  const [errorFeedback, setErrorFeedback] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUserContext();

  const API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/feedback";

  const addFeedback = async (feedback: CreateFeedback) => {
    try {
      const response = await axios.post(`${API_URL}/add`, feedback);
      setErrorFeedback("");
    } catch (err) {
      setErrorFeedback("An unexpected error occurred. Please try again.");
      if (axios.isAxiosError(err)) {
        // err is an AxiosError here
        if (err.response && err.response.data && err.response.data.error) {
          setErrorFeedback(err.response.data.error); // Use the error message from the backend
        } else if (err instanceof Error) {
          // Handle other types of errors (non-Axios errors)
          setErrorFeedback(err.response?.data);
          setModalVisible(true); // Show modal on error
        }
      }
    }
  };

  const handleAddFeedback = async () => {
    await addFeedback({
      reporter: user,
      content,
      category,
      reportedUsername: String(reportedUser), // assuming reportedUser is the ID
    });
    setModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.complaintsContainer}>
          <CustomText
            customStyle={styles.headerText}
            text={"Complaints and Feedbacks"}
            isBold={true}
          />
          <CustomText
            customStyle={styles.underText}
            text={"Your feedback is valuable to us!"}
          />
          <CustomText
            customStyle={styles.underText}
            text={"Let us know how we can improve."}
          />
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={[
                { label: "Report User", value: "REPORT_USER" },
                { label: "Customer Service", value: "CUSTOMER_SERVICE" },
                { label: "Technical Issues", value: "TECHNICAL_ISSUES" },
                { label: "Suggestions", value: "SUGGESTION" },
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Select Category", value: null }}
              value={category}
            />
          </View>

          {category === "REPORT_USER" && (
            <View style={styles.reportedUserBoxContainer}>
              <TextInput
                placeholder="Username to be reported"
                placeholderTextColor="#6F6F6F"
                style={styles.reportedUserBox}
                multiline={true}
                value={reportedUser}
                onChangeText={setReportedUser}
              />
            </View>
          )}

          <View style={styles.contentBoxContainer}>
            <TextInput
              placeholder="Content"
              placeholderTextColor="#6F6F6F"
              style={styles.contentBox}
              multiline={true}
              value={content}
              onChangeText={setContent}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddFeedback}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <CustomText
                  customStyle={styles.modalText}
                  text="Thank you for your feedback! We will review your message and get back to you soon."
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  complaintsContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerText: {
    fontSize: 23,
    margin: 20,
    color: "#FF5C00",
  },
  underText: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
  },
  pickerContainer: {
    width: "60%",
    marginVertical: 10,
  },
  contentBoxContainer: {
    width: "100%",
    marginVertical: 20,
  },

  reportedUserBoxContainer: {
    width: "70%",
    marginVertical: 20,
  },

  contentBox: {
    padding: 10,
    height: 200,
    backgroundColor: "#F0F0F0",
    textAlignVertical: "top",
    borderRadius: 10,
    color: "black",
  },

  reportedUserBox: {
    justifyContent: "center",
    height: 50,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    color: "black",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  submitButton: {
    backgroundColor: "#FF5C00",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#FF5C00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FF5C00", // Updated button color
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  error: {
    color: "red",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#F0F0F0",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#6F6F6F",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#F0F0F0",
  },
});
