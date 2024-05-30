package com.sporzvous.backend.User;

import com.sporzvous.backend.FriendRequest.FriendRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {
    private Long userId;
    private String email;
    private String fullName;
    private String username;
    private int age;
    private String gender;
    private String favoriteSport;
    private List<FriendRequestDTO> receivedFriendRequests;
}