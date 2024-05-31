package com.sporzvous.backend.User;

import com.sporzvous.backend.FriendRequest.FriendRequestDTO;
import com.sporzvous.backend.Rating.Rating;
import com.sporzvous.backend.SportRating.SportRating;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {
    private Long userId;
    private String base64Img;
    private String email;
    private String fullName;
    private String username;
    private int age;
    private String gender;
    private String favoriteSport;
    private List<FriendRequestDTO> receivedFriendRequests;
    private List<Rating> ratings;
    private List<SportRating> sportRatings;
}