package com.sporzvous.backend.Event;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event")
@AllArgsConstructor

public class EventController {
    private final EventService eventService;

    @PostMapping("/create")
    public ResponseEntity<String> createEvent(@RequestBody Event request) {
        try {
            Event newEvent = eventService.saveEvent(request);
            return ResponseEntity.ok(newEvent.getTitle() + " created successfully");
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/getUsers/{eventId}")
    public ResponseEntity<?> getEventUsers(@PathVariable Long eventId) {
        try {
            return ResponseEntity.ok(eventService.getEventUsers(eventId));
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{eventId}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long eventId) {
        try {
            eventService.deleteEvent(eventId);
            return ResponseEntity.ok("Event deleted successfully");
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
