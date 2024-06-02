import { useDarkMode } from "@/context/DarkModeContext";
import { Event } from "@/context/EventProvider";
import { User } from "@/context/UserProvider";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./CustomButton";

type PlayerRowProps = {
  player: User;
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
  const isPlayerOrganizer = event.organizer.userId === player.userId;
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
      <View style={styles.playerRow}>
        <TouchableOpacity
          style={styles.playerName}
          onPress={() => handlePlayerPress(player)}
        >
          <Text
            style={[
              { fontSize: 20, color: "#333" },
              isDarkMode && { color: "#fff" },
            ]}
          >
            {player.fullName}
          </Text>
        </TouchableOpacity>
        {isOrganizer && !isPlayerOrganizer && !isEventStarted && (
          <TouchableOpacity
            style={styles.deletePlayer}
            onPress={() => setLeaveEventPopupVisible(true)}
          >
            <MaterialIcons name="delete-outline" size={29} color="#FF3647" />
          </TouchableOpacity>
        )}
        {isEventOver && !isSelf && (
          <TouchableOpacity
            disabled={commentDisabled}
            style={[styles.ratePlayer, { opacity: commentDisabled ? 0.3 : 1 }]}
            onPress={() => handleRatePress(player)}
          >
            <AntDesign name="staro" size={24} color="black" />
          </TouchableOpacity>
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
              Are you sure you want to kick {player.username}?
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Yes" onPress={kickPlayer} />
              <Button
                title="No"
                onPress={() => setLeaveEventPopupVisible(false)}
              />
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
            <Text style={styles.modalText}>{player.username} kicked</Text>
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
    flex: 1,
    flexDirection: "row",
    margin: 2,
    padding: 5,
    alignContent: "center",
  },
  playerName: {
    flex: 1,
  },
  ratePlayer: {
    marginHorizontal: 4,
  },
  deletePlayer: {
    marginHorizontal: 4,
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
