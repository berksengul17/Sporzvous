package com.sporzvous.backend.Event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sporzvous.backend.Team.Team;
import com.sporzvous.backend.User.User;
import com.sporzvous.backend.UserEvent.UserEvent;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
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

    @ManyToMany(mappedBy = "events")
    private List<User> users;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Team> teams;
    private Integer maxParticipants;

    @OneToMany(mappedBy = "event")
    private List<UserEvent> eventParticipants;

    private Double latitude;
    private Double longitude;

    public Event(String title, String sport, String locationCity,
                 String locationDistrict, Integer participants,
                 Integer teamNumber, LocalDate eventDate,
                 LocalTime eventTime, Double skillRating,
                 String locationIndex, int isEventOver, User organizer,
                 List<User> users, Integer maxParticipants) {
        this.title = title;
        this.sport = sport;
        this.locationCity = locationCity;
        this.locationDistrict = locationDistrict;
        this.participants = participants;
        this.teamNumber = teamNumber;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.skillRating = skillRating;
        this.locationIndex = locationIndex;
        this.isEventOver = isEventOver;
        this.organizer = organizer;
        this.users = users;
        this.maxParticipants = maxParticipants;
        this.teams = new ArrayList<>();

    }

    @PostConstruct
    private void teamInitializer() {
        Team team1 = new Team("Team A", this, maxParticipants/2);
        Team team2 = new Team("Team B", this, maxParticipants/2);
        teams.add(team1);
        teams.add(team2);
    }

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

