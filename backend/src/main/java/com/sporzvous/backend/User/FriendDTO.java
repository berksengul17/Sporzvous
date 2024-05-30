package com.sporzvous.backend.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FriendDTO {
    private Long userId;
    private String email;
    private String fullName;
    private String username;
    private int age;
    private String gender;
    private String favoriteSport;
}

