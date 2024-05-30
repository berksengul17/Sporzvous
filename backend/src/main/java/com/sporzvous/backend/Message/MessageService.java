package com.sporzvous.backend.Message;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private SimpMessagingTemplate simpMessagingTemplate;

    public Message sendMessage(MessageDto message) {
        User receiver = userRepository.findById(message.getReceiverId())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));
        User sender = userRepository.findById(message.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));

        message.setTimeStamp(LocalDateTime.now());
        simpMessagingTemplate.convertAndSendToUser(receiver.getUserId().toString(), "/private", message);
        return messageRepository.save(new Message(sender, receiver, message.getContent(), message.getTimeStamp()));
    }

    public List<Message> getMessagesByReceiverId(Long receiverId) {
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return messageRepository.findByReceiver(receiver)
                .orElseThrow(() -> new IllegalArgumentException("No messages found related with the receiver" + receiverId));
    }

    public List<Message> getMessagesBetweenUsers(Long user1Id, Long user2Id) {
        User user1 = userRepository.findById(user1Id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User user2 = userRepository.findById(user2Id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return messageRepository.findMessagesBetweenUsers(user1, user2);
    }
}
