package com.sporzvous.backend.User;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.Feedback.Feedback;
import com.sporzvous.backend.FriendRequest.FriendRequest;
import com.sporzvous.backend.Rating.Rating;
import com.sporzvous.backend.SportRating.SportRating;
import com.sporzvous.backend.Team.Team;
import com.sporzvous.backend.UserEvent.UserEvent;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.Base64Utils;

import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private String country;
    @Lob
    private byte[] image;
    private int age;
    private String gender;
    private String favoriteSport;
    private int eventCount;
    private int isVerified;
    private UserStatus status;
    @ManyToMany
    @JoinTable(
            name = "user_event",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private List<Event> events;

    @OneToMany(mappedBy = "reporter", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Rating> ratings;

    @ManyToMany
    @JoinTable(
            name = "user_friend",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private List<User> friends;

    @ManyToMany
    @JoinTable(
            name = "user_team",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    private List<Team> teams;

    @OneToMany(mappedBy = "sender")
    private Set<FriendRequest> sentRequests = new HashSet<>();

    @OneToMany(mappedBy = "receiver")
    private Set<FriendRequest> receivedRequests = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private List<UserEvent> eventsParticipated;

    @OneToMany(mappedBy = "user")
    private List<SportRating> sportRatings;

    public User(Long userId, String email, String username) {
        this.userId = userId;
        this.email = email;
        this.username = username;
    }

    public User(Long userId, String email, String fullName, String username, String country, int age, String gender,
                String favoriteSport, int eventCount, int isVerified, UserStatus status, List<Event> events,
                List<Feedback> feedbacks, List<Rating> ratings, List<User> friends, List<Team> teams,
                Set<FriendRequest> sentRequests, Set<FriendRequest> receivedRequests) {
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.username = username;
        this.country = country;
        this.age = age;
        this.gender = gender;
        this.favoriteSport = favoriteSport;
        this.eventCount = eventCount;
        this.isVerified = isVerified;
        this.status = status;
        this.events = events;
        this.feedbacks = feedbacks;
        this.ratings = ratings;
        this.friends = friends;
        this.teams = teams;
        this.sentRequests = sentRequests;
        this.receivedRequests = receivedRequests;
    }

    public User(Long userId, String email, String password, String fullName,
                String username, String country, int age, String gender,
                String favoriteSport, int eventCount) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.username = username;
        this.country = country;
        this.age = age;
        this.gender = gender;
        this.favoriteSport = favoriteSport;
        this.eventCount = eventCount;
    }

    public String getImageAsBase64() {
        return this.image != null ? Base64.getEncoder().encodeToString(this.image) : null;
    }
}
