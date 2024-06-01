package com.sporzvous.backend.FriendRequest;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendRequestService {
    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Autowired
    private UserRepository userRepository;


    @Transactional
    public List<FriendRequestDTO> getFriendRequests(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<FriendRequest> requests = friendRequestRepository.findByReceiverAndFriendRequestStatus(user, FriendRequestStatus.PENDING);

        return requests.stream()
                .map(req -> new FriendRequestDTO(req.getFriendRequestId(), req.getSender().getUserId(),
                        req.getSender().getFullName(), req.getFriendRequestStatus()))
                .filter(req -> req.getFriendRequestStatus().equals(FriendRequestStatus.PENDING))
                .toList();
    }

    @Transactional
    public FriendRequest sendFriendRequest(String senderUsername, String receiverUsername) {
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new IllegalArgumentException("There does not exist such a user "));
        User receiver = userRepository.findByUsername(receiverUsername)
                .orElseThrow(() -> new IllegalArgumentException("There does not exist such a user "));

        if (sender == null || receiver == null) {
            throw new IllegalArgumentException("User not found");
        }

        FriendRequest friendRequest = new FriendRequest(sender, receiver);
        return friendRequestRepository.save(friendRequest);
    }

    @Transactional
    public FriendRequest respondToFriendRequest(Long requestId, FriendRequestStatus status) {

        FriendRequest friendRequest = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        if (status.equals(FriendRequestStatus.APPROVED)) {
            User sender = friendRequest.getSender();
            User receiver = friendRequest.getReceiver();

            sender.getFriends().add(receiver);
            receiver.getFriends().add(sender);

            userRepository.save(sender);
            userRepository.save(receiver);
        }

        friendRequest.setFriendRequestStatus(status);
        return friendRequestRepository.save(friendRequest);
    }

    public void deleteFriendship(Long requestId) {
        FriendRequest friendRequest = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Friendship not found"));

        friendRequestRepository.delete(friendRequest);
    }
}
