//package com.sporzvous.backend.FriendList;
//
//import com.sporzvous.backend.User.User;
//import com.sporzvous.backend.User.UserRepository;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@AllArgsConstructor
//public class UserFriendService {
//
//    private final UserFriendRepository userFriendRepository;
//    private final UserRepository userRepository;
//
//    public void addFriend(Long userId, String friendName) {
//
//        User friend = userRepository.findByUsername(friendName);
//
//        if (userId.equals(friend.getUserId())) {
//            throw new IllegalArgumentException("You can't add yourself as a friend");
//        }
//        if (userFriendRepository.isAlreadyFriends(userId, friend.getUserId())) {
//            throw new IllegalArgumentException("You are already friends");
//        }
//
//        User user1 = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
//
//        UserFriend userFriend = new UserFriend();
//
//        userFriend.setUser1(user1);
//        userFriend.setUser2(friend);
//
//        userFriendRepository.save(userFriend);
//    }
//
//    public List<UserFriend> getFriends(Long userId) {
//        return userFriendRepository.getFriends(userId);
//    }
//}
