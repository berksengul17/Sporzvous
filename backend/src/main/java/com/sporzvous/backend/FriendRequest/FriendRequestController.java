package com.sporzvous.backend.FriendRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequestMapping("/api/friendrequests")
    public class FriendRequestController {

        @Autowired
        private FriendRequestService friendRequestService;

        @PostMapping("/send")
        public ResponseEntity<String> sendFriendRequest(@RequestParam String senderUsername, @RequestParam String receiverUsername) {
            try {
                FriendRequest friendRequest = friendRequestService.sendFriendRequest(senderUsername, receiverUsername);
                return ResponseEntity.ok("Friend request with id " + friendRequest+ "is sent");
            } catch (Exception e){
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
    }

