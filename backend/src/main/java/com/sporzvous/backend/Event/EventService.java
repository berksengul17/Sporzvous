package com.sporzvous.backend.Event;

import com.sporzvous.backend.Team.Team;
import com.sporzvous.backend.Team.TeamService;
import com.sporzvous.backend.User.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor

public class EventService {
    private final EventRepository eventRepository;
    private final TeamService teamService;

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> filterEvents(String sport, String locationCity, String locationDistrict,
                                    LocalDate eventDate, int isEventOver, Long userId, double minRating) {
        return eventRepository.filterEvents(sport, locationCity, locationDistrict, eventDate, isEventOver, userId, minRating);
    }

    public List<User> getEventUsers(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        return event.getUsers();
    }

    public Event addUserToEvent(Long eventId, User user) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event with id" + eventId + "not found"));

        teamService.addUserToTeam(event, user);
        return eventRepository.save(event);
    }

    public Event removeUserFromEvent(Long eventId, User user) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event with id " + eventId + " not found"));

        event.getUsers().remove(user);
        return eventRepository.save(event);
    }

    public void changeTeam(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event with id " + eventId + " not found"));
        User user = event.getUsers().stream()
                .filter(u -> u.getUserId().equals(userId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("User with id " + userId + " not found"));

        Team currentTeam = null;
        Team otherTeam = null;

        // Identify current and other teams
        for (Team team : event.getTeams()) {
            if (team.getUsers().contains(user)) {
                currentTeam = team;
            } else {
                otherTeam = team;
            }
        }

        if (currentTeam == null || otherTeam == null) {
            throw new IllegalStateException("The user is not currently in any team or event teams are not properly initialized.");
        }

        teamService.changeTeam(currentTeam, otherTeam, user);
    }

    public void deleteEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        eventRepository.delete(event);
    }
}
