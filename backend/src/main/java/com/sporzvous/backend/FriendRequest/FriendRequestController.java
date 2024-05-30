package com.sporzvous.backend.FriendRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friendrequests")
public class FriendRequestController {

    @Autowired
    private FriendRequestService friendRequestService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getFriendRequests(@PathVariable Long userId) {
        try {
            List<FriendRequestDTO> requests = friendRequestService.getFriendRequests(userId);
            return ResponseEntity.ok(requests);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendFriendRequest(@RequestParam String senderUsername, @RequestParam String receiverUsername) {
        try {
            FriendRequest friendRequest = friendRequestService.sendFriendRequest(senderUsername, receiverUsername);
            return ResponseEntity.ok("Friend request with id " + friendRequest + "is sent");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/respond")
    public ResponseEntity<?> respondToFriendRequest(@RequestParam Long requestId, @RequestParam String status) {

        FriendRequestStatus friendRequestStatus;
        try {
            friendRequestStatus = FriendRequestStatus.valueOf(status.toUpperCase());
            FriendRequest updatedRequest = friendRequestService.respondToFriendRequest(requestId, friendRequestStatus);
            return ResponseEntity.ok(updatedRequest);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteFriend")
    public ResponseEntity<?> deleteFriend(@RequestParam Long requestId) {
        try {
            friendRequestService.deleteFriendship(requestId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}


