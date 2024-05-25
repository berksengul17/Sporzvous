package com.sporzvous.backend.UserEvent;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.Event.EventRepository;
import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserEventService {
    private final UserEventRepository userEventRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public UserEvent createUserEvent(User user, Event event) {
        userRepository.findById(user.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        eventRepository.findById(event.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        UserEvent userEvent = new UserEvent(user, event);
        return userEventRepository.save(userEvent);
    }
}
