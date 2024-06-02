package com.sporzvous.backend.SportRating;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sporzvous.backend.Rating.SportField;
import com.sporzvous.backend.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SportRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sportId;
    private SportField sportField;
    private double rating;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public SportRating(SportField sportField, double rating, User user) {
        this.sportField = sportField;
        this.rating = rating;
        this.user = user;
    }


    public void setUser(User user) {
        this.user = user;
    }

}
