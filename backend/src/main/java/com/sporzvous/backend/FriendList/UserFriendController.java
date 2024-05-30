//package com.sporzvous.backend.FriendList;
//
//import lombok.AllArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/friend")
//@AllArgsConstructor
//public class UserFriendController {
//
//    private final UserFriendService userFriendService;
//
//    @PostMapping("/add")
//    public ResponseEntity<?> addFriend(@RequestParam Long userId, @RequestParam String friendName) {
//        try {
//            userFriendService.addFriend(userId, friendName);
//            return ResponseEntity.ok("Friend added successfully");
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.internalServerError().body(e.getMessage());
//        }
//    }
//
//    @GetMapping("/friend-list")
//    public ResponseEntity<?> getFriends(@RequestParam Long userId) {
//        return ResponseEntity.ok(userFriendService.getFriends(userId));
//    }
//}
