package com.sporzvous.backend.Message;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@AllArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @MessageMapping("/private-message")
    public Message receivePrivateMessage(@Payload MessageDto message) {
        return messageService.sendMessage(message);
    }

    @GetMapping("/messages")
    public ResponseEntity<?> getMessagesBetweenUsers(@RequestParam Long user1Id, @RequestParam Long user2Id) {
        try {
            return ResponseEntity.ok(messageService.getMessagesBetweenUsers(user1Id, user2Id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
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
