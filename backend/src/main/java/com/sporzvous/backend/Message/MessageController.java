package com.sporzvous.backend.Message;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@AllArgsConstructor
public class MessageController {

    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/private-message")
    public Message receivePrivateMessage(@Payload Message message) {
        message.setTimestamp(LocalDateTime.now());
        simpMessagingTemplate.convertAndSendToUser(message.getReceiver().getUserId().toString(), "/private", message);
        return message;
    }


//    @GetMapping("/get")
//    public ResponseEntity<?> getMessagesBetweenUsers(@RequestParam Long receiverId, @RequestParam Long senderId) {
//        try {
//            if (senderId == null) {
//                return ResponseEntity.ok(messageService.getMessagesByReceiverId(receiverId));
//            } else {
//
//            return ResponseEntity.ok(messageService.getMessagesBetweenUsers(receiverId, senderId));
//            }
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(e.getMessage());
//        }
//    }
//
//    @PostMapping("/send")
//    public ResponseEntity<?> sendMessage(@RequestBody Message message) {
//        try {
//            User sender = userService.findUserByUsername(message.getSender().getUsername());
//            User receiver = userService.findUserByUsername(message.getReceiver().getUsername());
//            message.setSender(sender);
//            message.setReceiver(receiver);
//            return ResponseEntity.ok(messageService.saveMessage(message));
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(e.getMessage());
//        }
//    }
}
