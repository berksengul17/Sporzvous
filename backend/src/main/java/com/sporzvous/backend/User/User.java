package com.sporzvous.backend.User;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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

import java.util.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String email;
    private String password;
    private String fullName;
    private String username;
    private String country;
    private String image;
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
    @JsonIgnore
    private List<Event> events = new ArrayList<>();

    @OneToMany(mappedBy = "reporter", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Feedback> feedbacks = new ArrayList<>();

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Rating> ratings = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_friend",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private List<User> friends = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_team",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    @JsonIgnore
    private Set<Team> teams = new HashSet<>();

    @OneToMany(mappedBy = "sender")
    private Set<FriendRequest> sentRequests = new HashSet<>();

    @OneToMany(mappedBy = "receiver")
    private Set<FriendRequest> receivedRequests = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<UserEvent> eventsParticipated = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<SportRating> sportRatings = new ArrayList<>();

    public User(Long userId, String email, String username) {
        this.userId = userId;
        this.email = email;
        this.username = username;
    }

    public User(Long userId, String email, String fullName,
                String username, String country, int age, String gender,
                String favoriteSport, int eventCount, int isVerified, UserStatus status) {
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

    public User(String email, String password, String username, String country) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.country = country;
    }

    public void removeTeam(Team team) {
        this.teams.remove(team);
        team.getUsers().remove(this);
    }

}
