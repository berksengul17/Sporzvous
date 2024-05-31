package com.sporzvous.backend.SportRating;

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
    private String sportName;
    private double rating;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public SportRating(String sportName, double rating, User user) {
        this.sportName = sportName;
        this.rating = rating;
        this.user = user;
    }


    public void setUser(User user) {
        this.user = user;
    }

}
