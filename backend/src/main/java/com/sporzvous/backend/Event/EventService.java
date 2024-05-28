package com.sporzvous.backend.Event;

import com.sporzvous.backend.Team.Team;
import com.sporzvous.backend.Team.TeamService;
import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final TeamService teamService;

    public Event saveEvent(Event event) {

        if (Objects.equals(event.getTitle(), "")) {
            throw new IllegalArgumentException("Title cannot be Empty");

        }else if ((event.getTitle().length()) > 40) {
            throw new IllegalArgumentException("Title cannot be longer than 40");

        }else if (Objects.equals(event.getSport(), "")) {
            throw new IllegalArgumentException("Sport cannot be empty");

        }else if (Objects.equals(event.getLocationCity(), "")) {
            throw new IllegalArgumentException("LocationCity cannot be empty");

        }else if (Objects.equals(event.getLocationDistrict(), "")) {
            throw new IllegalArgumentException("LocationDistrict cannot be empty");

        }else if (Objects.equals(event.getMaxParticipants(), 0) || event.getMaxParticipants() == null  ) {
            throw new IllegalArgumentException("Event with no participants cannot created");

        }else if (event.getMaxParticipants() > 30)   {
            throw new IllegalArgumentException("Event with this number of participants cannot created");

        }else if (event.getEventDate() == null || event.getEventDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Deadline can't be before the current date.");
            
        }else if (event.getEventTime() == null || event.getEventTime().isBefore(LocalTime.now())) {
            throw new IllegalArgumentException("Deadline can't be before the current date.");
        }

        return eventRepository.save(event);
    }

    public List<Event> getMyEvents(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Event> allEvents = eventRepository.findAll();

        return allEvents.stream()
                .filter(event -> event.getUsers().contains(user) || event.getOrganizer().equals(user))
                .toList();
    }

    public List<Event> getEvents(Long userId) {
        return eventRepository.findAll()
                .stream()
                .filter(event -> event.getIsEventOver() == 0 &&
                        !Objects.equals(event.getOrganizer().getUserId(), userId))
                .toList();
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

    public Event getEvent(Long eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));
    }
}
