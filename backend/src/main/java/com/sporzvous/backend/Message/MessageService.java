package com.sporzvous.backend.Message;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final Set<Long> onlineUsers = new HashSet<>();

    public MessageDTO sendMessage(MessageDTO messageDTO) {
        User receiver = userRepository.findById(messageDTO.getReceiverId())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));
        User sender = userRepository.findById(messageDTO.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));

        Message message = new Message(sender, receiver, messageDTO.getContent(), LocalDateTime.now(), 0);

        MessageDTO responseDTO = new MessageDTO(
                message.getId(),
                message.getSender().getUserId(),
                message.getReceiver().getUserId(),
                message.getContent(),
                message.getReadStatus(),
                message.getTimestamp()
        );

        if (isUserOnline(receiver.getUserId())) {
            message.setReadStatus(1);
            simpMessagingTemplate.convertAndSendToUser(receiver.getUserId().toString(), "/private", responseDTO);
        }

        messageRepository.save(message);

        return responseDTO;
    }

    public List<MessageDTO> getMessagesBetweenUsers(Long user1Id, Long user2Id) {
        User user1 = userRepository.findById(user1Id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User user2 = userRepository.findById(user2Id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Message> messages = messageRepository.findMessagesBetweenUsers(user1, user2);

        return messages.stream()
                .map(message -> new MessageDTO(
                        message.getId(),
                        message.getSender().getUserId(),
                        message.getReceiver().getUserId(),
                        message.getContent(),
                        message.getReadStatus(),
                        message.getTimestamp()
                ))
                .toList();
    }

    public void markMessagesAsRead(List<Long> messageIds) {
        messageIds.forEach(messageId -> {
            Message message = messageRepository.findById(messageId)
                    .orElseThrow(() -> new IllegalArgumentException("Message not found"));
            message.setReadStatus(2);
            messageRepository.save(message);

            // Notify the receiver about the read status update
            MessageDTO messageDTO = new MessageDTO(
                    message.getId(),
                    message.getSender().getUserId(),
                    message.getReceiver().getUserId(),
                    message.getContent(),
                    message.getReadStatus(),
                    message.getTimestamp()
            );
            simpMessagingTemplate.convertAndSendToUser(
                    message.getReceiver().getUserId().toString(),
                    "/read-status",
                    messageDTO
            );
        });
    }

    public void processReadReceipt(ReadReceiptDTO readReceiptDTO) {
        Message message = messageRepository.findById(readReceiptDTO.getMessageId())
                .orElseThrow(() -> new IllegalArgumentException("Message not found"));

        // Only mark the message as read if the receiver is online
        if (isUserOnline(message.getReceiver().getUserId())) {
            message.setReadStatus(2);
            messageRepository.save(message);

            // Notify the sender about the read status update
            MessageDTO messageDTO = new MessageDTO(
                    message.getId(),
                    message.getSender().getUserId(),
                    message.getReceiver().getUserId(),
                    message.getContent(),
                    message.getReadStatus(),
                    message.getTimestamp()
            );
            simpMessagingTemplate.convertAndSendToUser(
                    readReceiptDTO.getSenderId().toString(),
                    "/read-status",
                    messageDTO
            );
        }
    }


    public void addUserOnline(Long userId) {
        onlineUsers.add(userId);
    }

    public void removeUserOnline(Long userId) {
        onlineUsers.remove(userId);
    }

    public boolean isUserOnline(Long userId) {
        return onlineUsers.contains(userId);
    }

}
