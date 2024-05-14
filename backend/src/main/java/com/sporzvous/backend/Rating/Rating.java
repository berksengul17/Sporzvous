package com.sporzvous.backend.Rating;

import com.sporzvous.backend.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.ZoneId;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId;
    private SportField sportField;
    private double rating;
    private String content;
    private LocalDate publishDate;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;

    public Rating(double rating, SportField sportField, String content, User user) {
        this.rating = rating;
        this.sportField = sportField;
        this.content = content;
        this.publishDate = LocalDate.now(ZoneId.of("Europe/Istanbul"));
        this.user = user;
    }
}
