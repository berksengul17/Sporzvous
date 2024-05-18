package com.sporzvous.backend.User;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserProfileUpdateDto {
    private String username;
    private String fullName;
    private Integer age;
    private String gender;
    private String favoriteSport;
    private MultipartFile profilePicture;
}