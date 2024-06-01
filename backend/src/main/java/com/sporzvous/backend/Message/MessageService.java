package com.sporzvous.backend.Message;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public MessageDTO sendMessage(MessageDTO messageDTO) {
        User receiver = userRepository.findById(messageDTO.getReceiverId())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));
        User sender = userRepository.findById(messageDTO.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));

        Message message = new Message(sender, receiver, messageDTO.getContent(), LocalDateTime.now());
        message = messageRepository.save(message);

        MessageDTO responseDTO = new MessageDTO(
                message.getId(),
                message.getSender().getUserId(),
                message.getReceiver().getUserId(),
                message.getContent(),
                message.isReadStatus(),
                message.getTimestamp()
        );

        simpMessagingTemplate.convertAndSendToUser(receiver.getUserId().toString(), "/private", responseDTO);
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
                        message.isReadStatus(),
                        message.getTimestamp()
                ))
                .collect(Collectors.toList());
    }

    public void markMessagesAsRead(List<Long> messageIds) {
        messageIds.forEach(messageId -> {
            Message message = messageRepository.findById(messageId)
                    .orElseThrow(() -> new IllegalArgumentException("Message not found"));
            message.setReadStatus(true);
            messageRepository.save(message);

            // Notify the receiver about the read status update
            MessageDTO messageDTO = new MessageDTO(
                    message.getId(),
                    message.getSender().getUserId(),
                    message.getReceiver().getUserId(),
                    message.getContent(),
                    message.isReadStatus(),
                    message.getTimestamp()
            );
            simpMessagingTemplate.convertAndSendToUser(
                    message.getReceiver().getUserId().toString(),
                    "/read-status",
                    messageDTO
            );
        });
    }
}
