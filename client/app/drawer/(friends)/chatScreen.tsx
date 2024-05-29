import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export type ChatMessage = {
  id: string;
  content: string;
  sender: string;
  receiver: string;
  timestamp: string;
};

const ChatScreen: React.FC = () => {
  const { receiverId, senderId, receiverName, receiverImage } =
    useLocalSearchParams();
  const navigation = useNavigation();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }, []);

  const onSend = () => {
    if (newMessage.trim()) {
      const newMsg: ChatMessage = {
        id: (messages.length + 1).toString(),
        content: newMessage,
        sender: senderId as string,
        receiver: receiverId as string,
        timestamp: new Date().toISOString(),
      };

      setNewMessage("");
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!receiverId || !senderId) {
    return <Text>Missing receiverId or senderId</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={65}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="#FF5C00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{receiverName}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === senderId
                ? styles.messageRight
                : styles.messageLeft,
            ]}
          >
            <Text
              style={[
                item.sender === senderId
                  ? styles.messageContentRight
                  : styles.messageContentLeft,
              ]}
            >
              {item.content}
            </Text>
            <Text
              style={[
                item.sender === senderId
                  ? styles.messageTimestampRight
                  : styles.messageTimestampLeft,
              ]}
            >
              {formatTime(item.timestamp)}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5C00",
  },
  messageContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginVertical: 5,
    margin: 10,
  },
  messageLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
  },
  messageRight: {
    alignSelf: "flex-end",
    backgroundColor: "#FF5C00",
  },
  messageSender: {
    fontWeight: "bold",
    color: "white",
  },
  messageContentRight: {
    marginTop: 5,
    color: "white",
  },
  messageContentLeft: {
    marginTop: 5,
    color: "black",
  },
  messageTimestampRight: {
    marginTop: 5,
    fontSize: 10,
    color: "#FFC5A2",
    alignSelf: "flex-end",
  },
  messageTimestampLeft: {
    marginTop: 5,
    fontSize: 10,
    color: "#8A8A8A",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FF5C00",
    borderRadius: 50,
    padding: 10,
  },
  sendButtonText: {
    color: "white",
  },
});

export default ChatScreen;
