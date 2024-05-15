package com.sporzvous.backend.FriendRequest;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FriendRequestService {
    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public FriendRequest sendFriendRequest(String senderUsername, String receiverUsername) {
        User sender = userRepository.findByUsername(senderUsername);
        User receiver = userRepository.findByUsername(receiverUsername);

        if (sender == null || receiver == null) {
            throw new IllegalArgumentException("User not found");
        }

        FriendRequest friendRequest = new FriendRequest(sender, receiver);
        return friendRequestRepository.save(friendRequest);
    }

    public FriendRequest respondToFriendRequest(Long requestId, FriendRequestStatus status) {

        FriendRequest friendRequest = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        friendRequest.setFriendRequestStatus(status);
        return friendRequestRepository.save(friendRequest);
    }

    public void deleteFriendship(Long requestId) {
        FriendRequest friendRequest = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Friendship not found"));

        friendRequestRepository.delete(friendRequest);
    }
}
