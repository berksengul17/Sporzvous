import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { AirbnbRating } from 'react-native-ratings';

export default function JoinEventScreen() {
  const router = useRouter();
  const { event } = useGlobalSearchParams();

  const parsedEvent = JSON.parse(event);

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
          <Text style={styles.value}>{parsedEvent.location}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>People Count</Text>
          <Text style={styles.value}>{parsedEvent.participants}/{parsedEvent.maxParticipants}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Team Count</Text>
          <Text style={styles.value}>{parsedEvent.teamCount}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{parsedEvent.date}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{parsedEvent.time}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Minimum Skill Level</Text>
          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={parsedEvent.skillLevel}
            size={24}
            showRating={false}
            selectedColor="#ffcc00"
            starContainerStyle={styles.starContainer}
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => router.push("drawer/(home)/map")}
          >
            <Text style={styles.locationButtonText}>Choose Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => {
              // Implement join functionality here
              Alert.alert("Joined the event!");
            }}
          >
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "orange",
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
});
