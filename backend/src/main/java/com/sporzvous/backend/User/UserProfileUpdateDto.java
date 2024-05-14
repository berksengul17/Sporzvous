package com.sporzvous.backend.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileUpdateDto {
    private String username;
    private Integer age;
    private String gender;
    private String favoriteSport;
}