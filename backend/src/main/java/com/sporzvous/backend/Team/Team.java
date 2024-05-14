package com.sporzvous.backend.Team;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.User.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;
    private String teamName;
    private Integer teamCapacity;

    @ManyToMany(mappedBy = "teams")
    private List<User> users;

    @ManyToOne
    @JoinColumn(name="event_id", nullable=false)
    private Event event;



    public Team(String teamName, Event event, Integer teamCapacity) {
        this.teamName = teamName;
        this.event = event;
        this.teamCapacity = teamCapacity;
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
