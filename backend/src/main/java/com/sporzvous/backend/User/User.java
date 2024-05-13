package com.sporzvous.backend.User;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String email;
    private String password;
    private String fullName;
    private String username;

    public User(Long userId, String email, String username) {
        this.userId = userId;
        this.email = email;
        this.username = username;
    }
}
