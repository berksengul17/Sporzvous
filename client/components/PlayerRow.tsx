import { useDarkMode } from "@/context/DarkModeContext";
import { Event } from "@/context/EventProvider";
import { User } from "@/context/UserProvider";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./CustomButton";

type PlayerRowProps = {
  player: User | null; // Adjusted to accept null for joinable places
  event: Event;
  isSelf: boolean;
  isOrganizer: boolean;
  commentDisabled: boolean;
  handleKickPlayer: () => void;
  handlePlayerPress: (player: User) => void;
  handleRatePress: (player: User) => void;
};

const PlayerRow = ({
  player,
  event,
  isSelf,
  isOrganizer,
  commentDisabled,
  handleKickPlayer,
  handlePlayerPress,
  handleRatePress,
}: PlayerRowProps) => {
  const [isLeaveEventPopupVisible, setLeaveEventPopupVisible] = useState(false);
  const [isKickedModalVisible, setKickedModalVisible] = useState(false);
  const isPlayerOrganizer = player && event.organizer.userId === player.userId;
  const isEventStarted = event.isEventOver !== 0;
  const isEventOver = event.isEventOver === 2;
  const { isDarkMode } = useDarkMode();

  const kickPlayer = () => {
    handleKickPlayer();
    setLeaveEventPopupVisible(false);
    setKickedModalVisible(true);
  };

  return (
    <>
      <View style={[styles.playerRow, isDarkMode && styles.darkPlayerRow]}>
        {player ? (
          <>
            <TouchableOpacity
              style={styles.playerInfo}
              onPress={() => handlePlayerPress(player)}
            >
              <Text
                style={[
                  styles.playerName,
                  { color: isDarkMode ? "#fff" : "#333" },
                ]}
              >
                {player.fullName}
              </Text>
              {isPlayerOrganizer && (
                <MaterialCommunityIcons
                  name="crown"
                  size={20}
                  color={"#FF5C00"}
                  style={{ marginHorizontal: 4 }}
                />
              )}
            </TouchableOpacity>
            <View style={styles.iconsContainer}>
              {isOrganizer && !isPlayerOrganizer && !isEventStarted && (
                <TouchableOpacity
                  style={styles.deletePlayer}
                  onPress={() => setLeaveEventPopupVisible(true)}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={20}
                    color="#FF3647"
                  />
                </TouchableOpacity>
              )}
              {isEventOver && !isSelf && (
                <TouchableOpacity
                  disabled={commentDisabled}
                  style={[
                    styles.ratePlayer,
                    { opacity: commentDisabled ? 0.3 : 1 },
                  ]}
                  onPress={() => handleRatePress(player)}
                >
                  <AntDesign name="staro" size={20} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </>
        ) : (
          <View style={styles.joinablePlace}>
            <Ionicons name="person-circle-outline" size={20} color="#FF5C00" />
          </View>
        )}
      </View>
      <Modal
        visible={isLeaveEventPopupVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setLeaveEventPopupVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to kick {player?.username}?
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="No"
                onPress={() => setLeaveEventPopupVisible(false)}
              />
              <Button title="Yes" onPress={kickPlayer} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isKickedModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setKickedModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{player?.username} kicked</Text>
            <Button title="OK" onPress={() => setKickedModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PlayerRow;

const styles = StyleSheet.create({
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10,
    backgroundColor: "#eaeaea",
    borderRadius: 10,
  },
  darkPlayerRow: {
    backgroundColor: "#222",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  playerName: {
    fontSize: 20,
    marginRight: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratePlayer: {
    marginHorizontal: 4,
  },
  deletePlayer: {
    marginHorizontal: 4,
  },
  joinablePlace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  joinableText: {
    fontSize: 20,
    color: "green",
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
