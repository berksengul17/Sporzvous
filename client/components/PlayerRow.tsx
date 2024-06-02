import { useDarkMode } from "@/context/DarkModeContext";
import { Event } from "@/context/EventProvider";
import { User } from "@/context/UserProvider";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PlayerRowProps = {
  player: User;
  event: Event;
  handlePlayerPress: (player: User) => void;
  handleRatePress: (player: User) => void;
};

const PlayerRow = ({
  player,
  event,
  handlePlayerPress,
  handleRatePress,
}: PlayerRowProps) => {
  const isOrganizer = event.organizer.userId === 2;
  const isEventOver = event.isEventOver !== 2;
  const canRatePlayer =
    player.userId !== event.organizer.userId && !isOrganizer && !isEventOver;

  const isDarkMode = useDarkMode();

  return (
    <View style={styles.playerRow}>
      <TouchableOpacity
        style={styles.playerName}
        onPress={() => handlePlayerPress(player)}
      >
        <Text style={[{ fontSize: 20 }, isDarkMode && { color: "#fff" }]}>
          {player.fullName}
        </Text>
      </TouchableOpacity>
      {isOrganizer && isEventOver && canRatePlayer && (
        <TouchableOpacity style={styles.deletePlayer}>
          <MaterialIcons name="delete-outline" size={29} color="#FF3647" />
        </TouchableOpacity>
      )}
      {!isOrganizer && !isEventOver && canRatePlayer && (
        <TouchableOpacity
          style={styles.ratePlayer}
          onPress={() => handleRatePress(player)}
        >
          <AntDesign name="staro" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
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
