import CustomButton from "@/components/CustomButton";
import { Event, useEventContext } from "@/context/EventProvider";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";

type EvaluateEventModalProps = {
  eventId: number;
  visible: boolean;
  setEventData: React.Dispatch<React.SetStateAction<Event>>;
  handleCancel: () => void;
};

const EvaluateEventModal = ({
  eventId,
  visible,
  setEventData,
  handleCancel,
}: EvaluateEventModalProps) => {
  const [teamAScore, setTeamAScore] = useState<string>("0");
  const [teamBScore, setTeamBScore] = useState<string>("0");

  const { addScore } = useEventContext();

  const handleEvaluateEvent = async () => {
    await addScore(eventId, teamAScore, teamBScore);
    setEventData((prev) => ({
      ...prev,
      teams: [
        { ...prev.teams[0], score: parseInt(teamAScore) },
        { ...prev.teams[1], score: parseInt(teamBScore) },
      ],
    }));
    handleCancel();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Evaluate Event</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 10,
            }}
          >
            <Text style={{ marginRight: 30 }}>Team A Score</Text>
            <Text>Team B Score</Text>
          </View>
          <View style={styles.evaluateTeamScores}>
            <TextInput
              keyboardType="numeric"
              value={teamAScore}
              onChangeText={(text) =>
                text ? setTeamAScore(text) : setTeamAScore("0")
              }
              style={styles.evaluateInputs}
              placeholder="Team A Score"
              placeholderTextColor="#6F6F6F"
            />
            <TextInput
              keyboardType="numeric"
              value={teamBScore}
              onChangeText={(text) =>
                text ? setTeamBScore(text) : setTeamBScore("0")
              }
              style={styles.evaluateInputs}
              placeholder="Team B Score"
              placeholderTextColor="#6F6F6F"
            />
          </View>
          <View style={styles.popupButtons}>
            <CustomButton title="Cancel" onPress={handleCancel} />
            <CustomButton title="Save" onPress={handleEvaluateEvent} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EvaluateEventModal;

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  evaluateTeamScores: {
    flexDirection: "row",
    alignItems: "center",
  },
  evaluateInputs: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    marginBottom: 15,
  },
});
