package com.sporzvous.backend.User;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sporzvous.backend.Comment.Comment;
import com.sporzvous.backend.Feedback.Feedback;
import com.sporzvous.backend.Rating.Rating;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    private int age;
    private String gender;
    private String favoriteSport;
    private int eventCount;
    private int isVerified;
    private UserStatus status;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Feedback feedback;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Rating> ratings;

    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private List<User> friends;


    public User(Long userId, String email, String username) {
        this.userId = userId;
        this.email = email;
        this.username = username;
    }
}
