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

    public Message sendMessage(MessageDTO message) {
        User receiver = userRepository.findById(message.getReceiverId())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));
        User sender = userRepository.findById(message.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));

        message.setTimestamp(LocalDateTime.now());
        simpMessagingTemplate.convertAndSendToUser(receiver.getUserId().toString(), "/private", message);
        return messageRepository.save(new Message(sender, receiver, message.getContent(), message.getTimestamp()));
    }

    public List<Message> getMessagesByReceiverId(Long receiverId) {
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return messageRepository.findByReceiver(receiver)
                .orElseThrow(() -> new IllegalArgumentException("No messages found related with the receiver" + receiverId));
    }

    public List<MessageDTO> getMessagesBetweenUsers(Long user1Id, Long user2Id) {
        User user1 = userRepository.findById(user1Id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User user2 = userRepository.findById(user2Id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Message> messsages = messageRepository.findMessagesBetweenUsers(user1, user2);

        return messsages.stream()
                        .map(message -> new MessageDTO(message.getId(), message.getSender().getUserId(),
                                message.getReceiver().getUserId(), message.getContent(), message.isReadStatus(),
                                message.getTimestamp()))
                        .toList();
    }

    public void markMessagesAsRead(List<Long> messageIds) {
        messageIds.forEach(messageId -> {
            Message message = messageRepository.findById(messageId)
                    .orElseThrow(() -> new IllegalArgumentException("Message not found"));
            message.setReadStatus(true);
            messageRepository.save(message);
        });
    }
}
