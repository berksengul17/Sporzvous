package com.sporzvous.backend.Event;

import com.sporzvous.backend.Team.Team;
import com.sporzvous.backend.Team.TeamService;
import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import com.sporzvous.backend.UserEvent.UserEventService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final TeamService teamService;
    private final UserEventService userEventService;

    @Transactional
    public Event saveEvent(Event event) {

        validateEvent(event);

        Event eventObj = new Event(event.getTitle(), event.getSport(), event.getLocationCity(),
                event.getLocationDistrict(), event.getParticipants(), event.getTeamNumber(), event.getEventDate(),
                event.getEventTime(), event.getSkillRating(), event.getLocationIndex(), event.getIsEventOver(),
                event.getOrganizer(), event.getUsers(), event.getMaxParticipants(), event.getLatitude(), event.getLongitude());


        Team team1 = new Team("Team A", eventObj, eventObj.getMaxParticipants() / 2);
        Team team2 = new Team("Team B", eventObj, eventObj.getMaxParticipants() / 2);
        eventObj.getTeams().add(team1);
        eventObj.getTeams().add(team2);
        return eventRepository.save(eventObj);
    }


    public Event changeStatus(Long eventId, int status) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        event.setIsEventOver(status);

        if (status == 2) {
            for (User user : event.getUsers()) {
                user.setEventCount(user.getEventCount() + 1);
            }
        }
        return eventRepository.save(event);
    }

    public List<Event> getMyEvents(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Event> allEvents = eventRepository.findAll();

        return allEvents.stream()
                .filter(event -> event.getUsers().contains(user) || event.getOrganizer().equals(user))
                // FIXME bu kısım daha genel bir yerde olmalı sanırım
                .map(event -> {
                    LocalDateTime eventDateTime = LocalDateTime.of(event.getEventDate(), event.getEventTime());
                    if (LocalDateTime.now().isAfter(eventDateTime.plusHours(6))) {
                        return changeStatus(event.getEventId(), 2);
                    } else if (LocalDateTime.now().withSecond(1).withNano(0)
                            .isAfter(eventDateTime.withSecond(0).withNano(0)) &&
                            event.getIsEventOver() != 2) {
                        event.setIsEventOver(1);
                        return eventRepository.save(event);
                    }

                    return event;
                })
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
                                    LocalDate startDate, LocalDate endDate, int isEventOver, Long userId, double minRating) {
        return eventRepository.filterEvents(sport, locationCity, locationDistrict,
                        startDate, endDate, isEventOver, userId, minRating)
                .stream()
                .filter(event -> event.getIsEventOver() == 0 &&
                        !Objects.equals(event.getOrganizer().getUserId(), userId))
                .toList();
    }

    public List<User> getEventUsers(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        return event.getUsers();
    }

    @Transactional
    public Event addUserToEvent(Long eventId, User user) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event with id" + eventId + "not found"));

        event.setParticipants(event.getParticipants() + 1);

        teamService.addUserToTeam(event, user);
        return eventRepository.save(event);
    }

    public Event removeUserFromEvent(Long eventId, User user) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event with id " + eventId + " not found"));

        event.getUsers().remove(user);
        event.setParticipants(event.getParticipants() - 1);
        // Remove user from team
        for (Team team : event.getTeams()) {
            if (team.getUsers().contains(user)) {
                user.removeTeam(team);
            }
        }
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

    private void validateEvent(Event event) {
        if (Objects.equals(event.getTitle(), "")) {
            throw new IllegalArgumentException("Title cannot be Empty");

        } else if ((event.getTitle().length()) > 40) {
            throw new IllegalArgumentException("Title cannot be longer than 40");

        } else if (Objects.equals(event.getSport(), "")) {
            throw new IllegalArgumentException("Sport cannot be empty");

        } else if (event.getLocationCity() == null) {
            throw new IllegalArgumentException("LocationCity cannot be empty");

        } else if (event.getLocationDistrict() == null) {
            throw new IllegalArgumentException("LocationDistrict cannot be empty");

        } else if (Objects.equals(event.getMaxParticipants(), 0) || event.getMaxParticipants() == null) {
            throw new IllegalArgumentException("Event with no participants cannot created");

        } else if (event.getMaxParticipants() > 30) {
            throw new IllegalArgumentException("Event with this number of participants cannot created");

        }else if (event.getMaxParticipants() % 2 == 1) {
            throw new IllegalArgumentException("Event with odd number of participants cannot created");

        } else if (event.getEventDate() == null) {
            throw new IllegalArgumentException("Date can't be empty.");

        } else if (event.getEventDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Date can't be before the current date.");

        }else if (event.getEventTime() == null) {
            throw new IllegalArgumentException("Time can't be empty.");

        } else if (event.getEventDate().equals(LocalDate.now()) && event.getEventTime().isBefore(LocalTime.now())) {
            throw new IllegalArgumentException("Time can't be before the current time.");

        } else if (event.getLatitude() == 0) {
            throw new IllegalArgumentException("Location is not chosen");

        } else if (event.getLongitude() == 0) {
            throw new IllegalArgumentException("Location is not chosen");
        }
    }
}
