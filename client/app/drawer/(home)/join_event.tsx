import { Event } from "@/context/EventProvider";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import { AirbnbRating } from "react-native-ratings";
import { useUserContext } from "../../../context/UserProvider";

export default function JoinEventScreen() {
  const router = useRouter();
  const { event, isJoined } = useGlobalSearchParams();
  const { joinEvent } = useUserContext();

  const parsedEvent: Event = JSON.parse(event as string);
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleJoin = async () => {
    try {
      const response = await joinEvent(parsedEvent);
      if (response.status === 200) {
        setModalMessage("You have successfully joined the event.");
      } else {
        setModalMessage("Failed to join the event.");
      }
      setModalVisible(true);
    } catch (error) {
      setModalMessage("An error occurred while trying to join the event.");
      setModalVisible(true);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Organizer</Text>
          <Text style={styles.value}>{parsedEvent.organizer.fullName}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Sport</Text>
          <Text style={styles.value}>{parsedEvent.sport}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>
            {parsedEvent.locationCity}, {parsedEvent.locationDistrict}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>People Count</Text>
          <Text style={styles.value}>
            {parsedEvent.participants}/{parsedEvent.maxParticipants}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Team Count</Text>
          <Text style={styles.value}>{parsedEvent.teamNumber}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{parsedEvent.eventDate}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{parsedEvent.eventTime}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Minimum Skill Level</Text>
          <AirbnbRating
            isDisabled={true}
            count={5}
            reviews={[]}
            defaultRating={parsedEvent.skillRating}
            size={24}
            showRating={false}
            selectedColor="#ffcc00"
            starContainerStyle={styles.starContainer}
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => setIsMapVisible(true)}
          >
            <Text style={styles.locationButtonText}>See Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.joinButton,
              isJoined === "true" ? { opacity: 0.5 } : {},
            ]}
            onPress={handleJoin}
            disabled={isJoined === "true"}
          >
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isMapVisible}
          onBackdropPress={() => setIsMapVisible(false)}
        >
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parsedEvent.latitude, // Event latitude
                longitude: parsedEvent.longitude, // Event longitude
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parsedEvent.latitude,
                  longitude: parsedEvent.longitude,
                }}
                title="Event Location"
              />
            </MapView>
            <Button
              title="Close"
              onPress={() => setIsMapVisible(false)}
              color="red"
            />
          </View>
        </Modal>
        <Modal
          animationIn="fadeIn"
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 16,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#333",
    flex: 2,
    textAlign: "right",
  },
  starContainer: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  locationButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flex: 1,
    marginRight: 10,
  },
  locationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  joinButton: {
    backgroundColor: "#FF5C00",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flex: 1,
    marginLeft: 10,
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
  centeredView: {
    flex: 1,
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
  buttonClose: {
    backgroundColor: "#FF5C00",
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
});
