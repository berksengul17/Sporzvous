package com.sporzvous.backend.Event;

import com.sporzvous.backend.User.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor

public class EventService {
    private final EventRepository eventRepository;

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

        event.getUsers().add(user);
        return eventRepository.save(event);
    }

    public void deleteEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        eventRepository.delete(event);
    }


}
