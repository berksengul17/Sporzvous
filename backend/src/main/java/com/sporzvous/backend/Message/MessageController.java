package com.sporzvous.backend.Message;

import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("/messages/mark-read")
    public ResponseEntity<?> markMessagesAsRead(@RequestBody List<Long> messageIds) {
        try {
         messageService.markMessagesAsRead(messageIds);
         return ResponseEntity.ok("Messages marked as read");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
