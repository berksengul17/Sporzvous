package com.sporzvous.backend.Team;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;
    private String teamName;
    private Integer teamCapacity;
    private Integer score;

    @ManyToMany(mappedBy = "teams")
    private Set<User> users = new HashSet<>(); // Initialize the list

    @ManyToOne
    @JoinColumn(name="event_id", nullable=false)
    @JsonIgnore
    private Event event;

    public Team(String teamName, Event event, Integer teamCapacity) {
        this.teamName = teamName;
        this.event = event;
        this.teamCapacity = teamCapacity;
        this.score = 0;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Team team = (Team) o;
        return teamId != null && Objects.equals(teamId, team.teamId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
