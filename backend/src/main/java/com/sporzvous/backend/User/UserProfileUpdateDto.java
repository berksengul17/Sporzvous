package com.sporzvous.backend.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileUpdateDto {
    private String username;
    private String fullName;
    private Integer age;
    private String gender;
    private String favoriteSport;
    private String image; // Change from MultipartFile to String

    // Getters and Setters
}
