package com.sporzvous.backend.Message;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public List<Message> getMessagesByReceiverId(Long receiverId) {
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return messageRepository.findByReceiver(receiver)
                .orElseThrow(() -> new IllegalArgumentException("No messages found related with the receiver" + receiverId));
    }

    public List<Message> getMessagesBetweenUsers(Long receiverId, Long senderId) {
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return messageRepository.findBySenderAndReceiver(sender, receiver)
                .orElseThrow(() -> new IllegalArgumentException("No messages found between the users" + senderId + " and " + receiverId));
    }

    public Message saveMessage(Message message) {
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }
}
