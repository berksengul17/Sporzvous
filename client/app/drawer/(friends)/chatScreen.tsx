import { User, useUserContext } from "@/context/UserProvider";
import { Ionicons } from "@expo/vector-icons";
import { Client } from "@stomp/stompjs";
import axios from "axios";
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

export type ChatMessage = {
  id: string;
  content: string;
  senderId: number;
  receiverId: number;
  timestamp: string;
  status: "JOIN" | "MESSAGE" | "LEAVE";
};

let stompClient: Client | null = null;

const ChatScreen: React.FC = () => {
  const { receiverId } = useLocalSearchParams();
  const { user } = useUserContext();
  const navigation = useNavigation();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log("Initializing WebSocket connection...");
    stompClient = new Client();
    stompClient.configure({
      brokerURL: "ws://192.168.1.43:8082/ws",
      // webSocketFactory: () => new SockJS("http://192.168.1.43:8082/ws"),
      reconnectDelay: 5000,
      onConnect: onConnected,
      onStompError: onStompError,
      onWebSocketClose: onWebSocketClose,
      onWebSocketError: onWebSocketError,
      debug: (str) => {
        console.log("STOMP debug:", str);
      },
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
    });
    stompClient.activate();

    // Fetch messages from the backend
    axios
      .get(
        `${process.env.EXPO_PUBLIC_API_URL}/messages?user1Id=${user.userId}&user2Id=${receiverId}`
      )
      .then((response) => {
        setMessages(
          response.data.map(
            ({
              id,
              content,
              sender: { userId: senderId },
              receiver: { userId: receiverId },
              timestamp,
              status,
            }: {
              id: string;
              content: string;
              sender: User;
              receiver: User;
              timestamp: string;
              status: string;
            }) => ({
              id,
              content,
              senderId,
              receiverId,
              timestamp,
              status,
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    return () => {
      console.log("Deactivating STOMP client...");
      stompClient?.deactivate();
    };
  }, [user.userId, receiverId]);

  const onConnected = () => {
    console.log("Connected to STOMP server");
    stompClient?.subscribe(`/user/${user.userId}/private`, onPrivateMessage);
    setConnected(true);
    userJoin();
  };

  const onStompError = (frame: any) => {
    console.error("STOMP error:", frame.headers["message"]);
    setConnected(false);
  };

  const onWebSocketClose = (evt: any) => {
    console.log("WebSocket closed:", evt);
    setConnected(false);
  };

  const onWebSocketError = (evt: any) => {
    console.error("WebSocket error:", evt);
    setConnected(false);
  };

  const userJoin = () => {
    const chatMessage = {
      senderId: user.userId,
      status: "JOIN",
    };
    if (stompClient && connected) {
      stompClient.publish({
        destination: "/app/private-message",
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.warn("Not connected to the STOMP server, cannot join");
    }
  };

  const onSend = () => {
    if (newMessage.trim()) {
      if (connected && stompClient) {
        const newMsg: ChatMessage = {
          id: (messages.length + 1).toString(),
          content: newMessage,
          senderId: user.userId,
          receiverId: parseInt(receiverId as string),
          timestamp: new Date().toISOString(),
          status: "MESSAGE",
        };

        stompClient.publish({
          destination: "/app/private-message",
          body: JSON.stringify(newMsg),
        });
        console.log("Message sent:", newMsg);
        setNewMessage("");
        setMessages((prevMessages) => [...prevMessages, newMsg]);
      } else {
        console.warn("Not connected to the STOMP server");
      }
    }
  };

  const onPrivateMessage = (message: any) => {
    const payloadData = JSON.parse(message.body);
    setMessages((prevMessages) => [...prevMessages, payloadData]);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!receiverId || !user.userId) {
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
        <Text style={styles.headerTitle}>{receiverId}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.senderId === user.userId
                ? styles.messageRight
                : styles.messageLeft,
            ]}
          >
            <Text
              style={[
                item.senderId === user.userId
                  ? styles.messageContentRight
                  : styles.messageContentLeft,
              ]}
            >
              {item.content}
            </Text>
            <Text
              style={[
                item.senderId === user.userId
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
