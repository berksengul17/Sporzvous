import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const initialSportsData = [
  { id: "1", name: "Basketball", icon: "basketball", visible: true },
  { id: "2", name: "Football", icon: "soccer", visible: true },
  { id: "3", name: "Volleyball", icon: "volleyball", visible: true },
  { id: "4", name: "Tennis", icon: "tennis", visible: true },
  { id: "5", name: "Baseball", icon: "baseball", visible: true },
  { id: "6", name: "Badminton", icon: "badminton", visible: true },
  { id: "7", name: "Handball", icon: "handball", visible: true },
  { id: "8", name: "Ice Hockey", icon: "hockey-puck", visible: true },
  { id: "9", name: "Paintball", icon: "pistol", visible: true },
];

const SportCard = ({ sport, onDiscard, onAddBack, isCustomizeMode }) => {
  const router = useRouter();

  const handlePress = () => {
    if (!isCustomizeMode) {
      router.push({
        pathname: "drawer/(home)/home",
        params: { sport: sport.name },
      });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, !sport.visible && styles.cardInvisible]}
      onPress={handlePress}
    >
      <MaterialCommunityIcons name={sport.icon} size={40} color="#FF5C00" />
      <Text style={styles.cardText}>{sport.name}</Text>
      {isCustomizeMode && (
        <TouchableOpacity
          onPress={() =>
            sport.visible ? onDiscard(sport.id) : onAddBack(sport.id)
          }
          style={styles.actionButton}
        >
          <Ionicons
            name={sport.visible ? "remove-circle" : "add-circle"}
            size={20}
            color={sport.visible ? "red" : "green"}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default function SportsScreen() {
  const [sportsData, setSportsData] = useState(initialSportsData);
  const [isCustomizeMode, setIsCustomizeMode] = useState(false);

  const handleDiscardSport = (id) => {
    setSportsData(
      sportsData.map((sport) =>
        sport.id === id ? { ...sport, visible: false } : sport
      )
    );
  };

  const handleAddBackSport = (id) => {
    setSportsData(
      sportsData.map((sport) =>
        sport.id === id ? { ...sport, visible: true } : sport
      )
    );
  };

  const handleDragEnd = ({ data }) => {
    setSportsData(data);
  };

  const handleSave = () => {
    setIsCustomizeMode(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.topContent}>
            <Text style={styles.headerText}>Join or host an event today!</Text>
            <TouchableOpacity
              onPress={() => router.push("drawer/(home)/createEventModal")}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Create Event</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSports}>
            <View style={styles.editButtonContainer}>
              <TouchableOpacity
                onPress={() => setIsCustomizeMode(!isCustomizeMode)}
                style={styles.editButton}
              >
                <Text style={styles.editButtonText}>
                  {isCustomizeMode ? "Save" : "Edit"}
                </Text>
                <Ionicons
                  name={isCustomizeMode ? "checkmark" : "pencil"}
                  size={20}
                  color="#FF5C00"
                />
              </TouchableOpacity>
            </View>
            <DraggableFlatList
              data={sportsData.filter(
                (sport) => isCustomizeMode || sport.visible
              )}
              renderItem={({
                item,
                drag,
                isActive,
              }: RenderItemParams<Item>) => (
                <TouchableOpacity
                  style={[
                    styles.cardContainer,
                    { backgroundColor: isActive ? "#e0e0e0" : "#fff" },
                  ]}
                  onLongPress={drag}
                  disabled={!isCustomizeMode}
                >
                  <SportCard
                    sport={item}
                    onDiscard={handleDiscardSport}
                    onAddBack={handleAddBackSport}
                    isCustomizeMode={isCustomizeMode}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              onDragEnd={handleDragEnd}
              numColumns={2}
              contentContainerStyle={styles.list}
              columnWrapperStyle={styles.row}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  topContent: {
    height: Dimensions.get("window").height / 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF5C00",
    borderRadius: 30,
    padding: 20,
  },
  bottomSports: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "relative",
  },
  editButtonContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
    marginRight: 10,
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cardContainer: {
    flexBasis: "45%",
    marginBottom: 20,
    marginHorizontal: "2.5%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 130,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  cardInvisible: {
    opacity: 0.4,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  actionButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: "#FF5C00",
    fontWeight: "bold",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editButtonText: {
    fontSize: 16,
    color: "#FF5C00",
    fontWeight: "bold",
    marginRight: 5,
  },
});
