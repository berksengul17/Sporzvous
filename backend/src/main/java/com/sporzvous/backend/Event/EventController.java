package com.sporzvous.backend.Event;

import com.sporzvous.backend.Team.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/event")
@AllArgsConstructor
public class EventController {
    private final EventService eventService;
    private final TeamService teamService;

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
    @PostMapping("/addScore/{eventId}")
    public ResponseEntity<?> addScore(@PathVariable Long eventId, Integer firstTeamScore, Integer secondTeamScore) {
        try {
            teamService.addScore(eventId, firstTeamScore, secondTeamScore);

            return ResponseEntity.ok("Team scores added to event with eventId" + eventId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/get-event/{eventId}")
    public ResponseEntity<?> getEvent(@PathVariable Long eventId) {
        try {
            return ResponseEntity.ok(eventService.getEvent(eventId));
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/get-my-events/{userId}")
    public ResponseEntity<?> getMyEvents(@PathVariable Long userId) {
        try {
            List<Event> myEvents = eventService.getMyEvents(userId);
            return ResponseEntity.ok(myEvents);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/get-events/{userId}")
    public ResponseEntity<?> getEvents(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(eventService.getEvents(userId));
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterEvents(@RequestParam(required = false) String sport,
                                          @RequestParam(required = false) String locationCity,
                                          @RequestParam(required = false) String locationDistrict,
                                          @RequestParam(required = false) LocalDate eventDate,
                                          @RequestParam(required = false, defaultValue = "0") Integer isEventOver,
                                          @RequestParam(required = false) Long userId,
                                          @RequestParam(required = false, defaultValue = "0") double minRating) {
        try {
            return ResponseEntity.ok(eventService.filterEvents(sport, locationCity, locationDistrict,
                                                            eventDate, isEventOver, userId, minRating));
        } catch(Exception e) {
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

    @PutMapping("/{eventId}/changeTeam")
    public ResponseEntity<String> changeTeam(@PathVariable Long eventId, @RequestParam Long userId) {
        try {
            eventService.changeTeam(eventId, userId);
            return ResponseEntity.ok("Team changed successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
