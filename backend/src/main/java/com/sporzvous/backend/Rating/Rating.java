package com.sporzvous.backend.Rating;

import com.sporzvous.backend.Event.Event;
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
    @Enumerated(EnumType.STRING)
    private RatingCategory category;
    @Enumerated(EnumType.STRING)
    private SportField sportField;
    private double rating;
    private String content;
    private LocalDate publishDate;
    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "eventId")
    public Event event;
    @ManyToOne
    @JoinColumn(name = "sender_id", referencedColumnName = "userId")
    private User sender;
    @ManyToOne
    @JoinColumn(name = "receiver_id", referencedColumnName = "userId")
    private User receiver;



    public Rating(RatingCategory category, double rating, SportField sportField,
                  String content, Event event, User sender, User receiver) {
        this.category = category;
        this.rating = rating;
        this.sportField = sportField;
        this.content = content;
        this.publishDate = LocalDate.now(ZoneId.of("Europe/Istanbul"));
        this.event = event;
        this.sender = sender;
        this.receiver = receiver;
    }
}
