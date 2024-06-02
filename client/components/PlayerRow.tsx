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
  const isPlayerOrganizer = event.organizer.userId === player.userId;
  const isEventStarted = event.isEventOver !== 0;
  const isEventOver = event.isEventOver === 2;

  return (
    <>
      <View style={styles.playerRow}>
        <TouchableOpacity
          style={styles.playerName}
          onPress={() => handlePlayerPress(player)}
        >
          <Text style={{ fontSize: 20 }}>{player.fullName}</Text>
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
      {/* TODO stil lazım */}
      <Modal visible={isLeaveEventPopupVisible} animationType="slide">
        <View>
          <Text>Are you sure you want to kick {player.username}?</Text>
          <Button title="Yes" onPress={handleKickPlayer} />
          <Button title="No" onPress={() => setLeaveEventPopupVisible(false)} />
        </View>
      </Modal>
    </>
  );
};

export default PlayerRow;

// styles.js

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
});
