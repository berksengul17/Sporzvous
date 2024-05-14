package com.sporzvous.backend.Team;

import com.sporzvous.backend.User.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data

public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;
    private String teamName;
    private List<User> users;
    @ManyToOne
    @JoinColumn(name="event_id", nullable=false)
    private Long eventId;


    public Team(String teamName, Long eventId) {
        this.teamName = teamName;
        this.eventId = eventId;
    }
}
