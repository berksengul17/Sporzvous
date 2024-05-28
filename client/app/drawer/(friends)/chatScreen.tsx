import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const dummyMessages = [
  {
    id: '1',
    content: 'Hello!',
    sender: 'User1',
    receiver: 'User2',
    timestamp: '2024-05-28T12:34:56',
  },
  {
    id: '2',
    content: 'Hi there!',
    sender: 'User2',
    receiver: 'User1',
    timestamp: '2024-05-28T12:35:00',
  },
  // Add more dummy messages if needed
];

const ChatScreen = () => {
  const { receiverId, senderId, receiverName, receiverImage } = useLocalSearchParams();
  const navigation = useNavigation();
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: (messages.length + 1).toString(),
        content: newMessage,
        sender: 'User1', // Replace with dynamic sender id or name
        receiver: 'User2', // Replace with dynamic receiver id or name
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!receiverId || !senderId) {
    return <Text>Missing receiverId or senderId</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={65} // Adjust this value according to your header height or other elements
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={24} color="#FF5C00" />
        </TouchableOpacity>
        <Image source={{ uri: {receiverImage}}} style={styles.profileImage} />
        <Text style={styles.headerTitle}>{receiverName}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === 'User1' ? styles.messageRight : styles.messageLeft,
            ]}
          >
            <Text
              style={[
                item.sender === 'User1' ? styles.messageContentRight : styles.messageContentLeft,
              ]}
            >{item.content}</Text>
            <Text
              style={[
                item.sender === 'User1' ? styles.messageTimestampRight : styles.messageTimestampLeft,
              ]}
            >{formatTime(item.timestamp)}</Text>
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
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5C00',
  },
  messageContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginVertical: 5,
    margin: 10,
  },
  messageLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  messageRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF5C00',
  },
  messageSender: {
    fontWeight: 'bold',
    color: 'white',
  },
  messageContentRight: {
    marginTop: 5,
    color: 'white',
  },
  messageContentLeft: {
    marginTop: 5,
    color: 'black',
  },
  messageTimestampRight: {
    marginTop: 5,
    fontSize: 10,
    color: '#FFC5A2',
    alignSelf: 'flex-end',
  },
  messageTimestampLeft: {
    marginTop: 5,
    fontSize: 10,
    color: '#8A8A8A',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FF5C00',
    borderRadius: 50,
    padding: 10,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default ChatScreen;
