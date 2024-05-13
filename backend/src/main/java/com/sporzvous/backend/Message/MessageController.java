package com.sporzvous.backend.Message;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/messages")
@AllArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final UserService userService;

    @GetMapping("/get")
    public ResponseEntity<?> getMessagesBetweenUsers(@RequestParam Long receiverId, @RequestParam Long senderId) {
        try {
            if (senderId == null) {
                return ResponseEntity.ok(messageService.getMessagesByReceiverId(receiverId));
            } else {

            return ResponseEntity.ok(messageService.getMessagesBetweenUsers(receiverId, senderId));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Message message) {
        try {
            User sender = userService.findUserByUsername(message.getSender().getUsername());
            User receiver = userService.findUserByUsername(message.getReceiver().getUsername());
            message.setSender(sender);
            message.setReceiver(receiver);
            return ResponseEntity.ok(messageService.saveMessage(message));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
