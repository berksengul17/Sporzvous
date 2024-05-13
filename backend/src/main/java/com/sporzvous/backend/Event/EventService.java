package com.sporzvous.backend.Event;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor

public class EventService {
    private final EventRepository eventRepository;
}
