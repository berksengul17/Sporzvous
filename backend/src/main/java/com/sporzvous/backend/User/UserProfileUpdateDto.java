package com.sporzvous.backend.User;

import com.sporzvous.backend.SportRating.SportRating;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserProfileUpdateDto {
    private String username;
    private String fullName;
    private Integer age;
    private String gender;
    private String favoriteSport;
    private String image; // Change from MultipartFile to String
    private List<SportRating> sportRatings;

    // Getters and Setters
}
