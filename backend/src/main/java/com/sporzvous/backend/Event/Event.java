package com.sporzvous.backend.Event;

import com.sporzvous.backend.User.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;
    private String title;
    private String sport;
    private String locationCity;
    private String locationDistrict;
    private Integer participants;
    private Integer teamNumber;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private Double skillRating;
    private String locationIndex;
    private int isEventOver;
    @ManyToOne
    @JoinColumn(name="organizer_id", referencedColumnName="userId", nullable=false)
    private User organizer;
    @ManyToMany
    @JoinTable(
            name = "event_user",
            joinColumns = @JoinColumn(name = "eventId"),
            inverseJoinColumns = @JoinColumn(name = "userId"))
    @ToString.Exclude
    private List<User> users;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Event event = (Event) o;
        return eventId != null && Objects.equals(eventId, event.eventId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

