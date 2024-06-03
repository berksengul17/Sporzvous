import { useUserContext } from "@/context/UserProvider";
import { Ionicons } from "@expo/vector-icons";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

export type ChatMessage = {
  id: string;
  content: string;
  senderId: number;
  receiverId: number;
  timestamp: string;
  readStatus: number;
};

let stompClient: Client | null = null;

const ChatScreen: React.FC = () => {
  const { receiverId } = useLocalSearchParams();
  const { user } = useUserContext();
  const navigation = useNavigation();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const readMessages = useRef<Set<string>>(new Set());
  const flatlist = useRef<FlatList>(null);

  useEffect(() => {
    const userId = user.userId;

    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/online`)
      .then(() => console.log(`User ${userId} is online`))
      .catch((error) => console.error("Error marking user as online", error));

    return () => {
      axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/offline`)
        .then(() => console.log(`User ${userId} is offline`))
        .catch((error) =>
          console.error("Error marking user as offline", error)
        );
    };
  }, [user.userId]);

  useEffect(() => {
    console.log("Initializing WebSocket connection...");
    stompClient = new Client();
    stompClient.configure({
      brokerURL: "ws://192.168.1.106:8082/ws",
      reconnectDelay: 5000,
      onConnect: onConnected,
      onStompError: onStompError,
      onWebSocketClose: onWebSocketClose,
      onWebSocketError: onWebSocketError,
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
        const fetchedMessages = response.data.map(
          ({
            id,
            senderId,
            receiverId,
            content,
            timestamp,
            readStatus,
          }: ChatMessage) => ({
            id,
            senderId,
            receiverId,
            content,
            timestamp,
            readStatus,
          })
        );

        const newReadMessages = new Set(readMessages.current);
        fetchedMessages.forEach((message: ChatMessage) => {
          if (message.receiverId === user.userId && message.readStatus != 2) {
            newReadMessages.add(message.id);
            message.readStatus = 2;

            // Mark the message as read on the server
            axios
              .put(`${process.env.EXPO_PUBLIC_API_URL}/messages/mark-read`, [
                message.id,
              ])
              .then(() => {
                console.log(
                  "Message marked as read on the server:",
                  message.id
                );
              })
              .catch((error) => {
                console.error("Error marking message as read:", error);
              });
          }
        });

        console.log("fetched", fetchedMessages);

        setMessages(fetchedMessages);

        readMessages.current = newReadMessages;
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    return () => {
      console.log("Deactivating STOMP client...");

      if (readMessages.current.size > 0) {
        axios
          .put(
            `${process.env.EXPO_PUBLIC_API_URL}/messages/mark-read`,
            Array.from(readMessages.current)
          )
          .then(() => console.log("Messages are marked as read"))
          .catch(() => console.log("Error marking messages as read"));
      }

      stompClient?.deactivate();
    };
  }, [user.userId, receiverId]);

  const onConnected = () => {
    console.log("Connected to STOMP server");
    stompClient?.subscribe(`/user/${user.userId}/private`, onPrivateMessage);
    stompClient?.subscribe(
      `/user/${user.userId}/read-status`,
      onReadStatusUpdate
    );
    stompClient?.subscribe(
      `/user/${user.userId}/read-receipt`,
      onReadReceiptReceived
    );
    setConnected(true);
    userJoin();
  };

  const onReadReceiptReceived = (message: any) => {
    const { messageId } = JSON.parse(message.body);

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, readStatus: 2 } : msg
      )
    );
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
    }
  };

  const onSend = () => {
    if (newMessage.trim()) {
      if (connected && stompClient) {
        let id = 1;
        if (messages.length > 0) {
          id = parseInt(messages[messages.length - 1].id) + 1;
        }
        const newMsg: ChatMessage = {
          id: id.toString(),
          content: newMessage,
          senderId: user.userId,
          receiverId: parseInt(receiverId as string),
          timestamp: new Date().toISOString(),
          readStatus: 0,
        };

        stompClient.publish({
          destination: "/app/private-message",
          body: JSON.stringify(newMsg),
        });

        console.log("Message sent:", newMsg);
        setNewMessage("");
        setMessages((prevMessages) => [...prevMessages, newMsg]);

        // Simulate read receipt if receiver is online
        if (connected) {
          stompClient.publish({
            destination: `/app/read-receipt/${receiverId}`,
            body: JSON.stringify({ messageId: newMsg.id }),
          });

          // Update the read status locally
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === newMsg.id ? { ...msg, readStatus: 2 } : msg
            )
          );
        }
      }
    }
  };

  const onPrivateMessage = (message: any) => {
    const payloadData = JSON.parse(message.body);

    if (
      payloadData.receiverId == user.userId &&
      payloadData.readStatus != true
    ) {
      payloadData.readStatus = true;

      // Mark the message as read on the server
      axios
        .put(`${process.env.EXPO_PUBLIC_API_URL}/messages/mark-read`, [
          payloadData.id,
        ])
        .then(() => {
          console.log("Message marked as read on the server:", payloadData.id);
        })
        .catch((error) => {
          console.error("Error marking message as read:", error);
        });

      readMessages.current.add(payloadData.id);

      // Send read receipt back to the sender
      stompClient?.publish({
        destination: `/app/read-receipt`,
        body: JSON.stringify({
          messageId: payloadData.id,
          senderId: payloadData.senderId,
        }),
      });
    }

    setMessages((prevMessages) => [...prevMessages, payloadData]);
  };

  const onReadStatusUpdate = (message: any) => {
    const payloadData = JSON.parse(message.body);

    // Create a new array with the updated read status
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === payloadData.id
          ? { ...msg, readStatus: payloadData.readStatus }
          : msg
      )
    );
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
        ref={flatlist}
        onContentSizeChange={() =>
          flatlist.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatlist.current?.scrollToEnd({ animated: true })}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // console.log("Rendering message:", item);
          return (
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
          );
        }}
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
