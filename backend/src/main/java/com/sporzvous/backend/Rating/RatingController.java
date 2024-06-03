package com.sporzvous.backend.Rating;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/ratings")
@AllArgsConstructor
public class RatingController {
    private final RatingService ratingService;

    @GetMapping("/filter")
    public ResponseEntity<?> filterRatings(HttpSession session,
                                           @RequestParam(required = false) String sport,
                                           @RequestParam(required = false) LocalDate date,
                                           @RequestParam(required = false) Integer score,
                                           @RequestParam(required = false) RatingCategory category) {
        FilterState filterState = (FilterState) session.getAttribute("filterState");
        if (filterState == null) {
            filterState = new FilterState();
        }

        if (sport != null) {
            filterState.setSport(sport);
        }
        if (date != null) {
            filterState.setDate(date);
        }
        if (score != null) {
            filterState.setScore(score);
        }
        if (category != null) {
            filterState.setCategory(category);
        }

        session.setAttribute("filterState", filterState);

        try {
            List<Rating> ratings = ratingService.filterRatings(filterState);
            return ResponseEntity.ok(ratings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/get-all-comments/{userId}")
    public ResponseEntity<?> getComments(@PathVariable Long userId ) {
        try {
            List<Rating> ratings = ratingService.getComments(userId);
            return ResponseEntity.ok(ratings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/clearFilters")
    public ResponseEntity<?> clearFilters(HttpSession session) {
        session.removeAttribute("filterState");
        return ResponseEntity.ok("Filters cleared");
    }

    @GetMapping("/get-event-ratings/{eventId}/{userId}")
    public ResponseEntity<?> getRatingsGivenByUserForEvent(@PathVariable Long userId,
                                                           @PathVariable Long eventId) {
        try {
            List<Long> userIds = ratingService.getRatingsGivenByUserForEvent(userId, eventId);
            return ResponseEntity.ok(userIds);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/getRatingByOthers/{userId}")
    public ResponseEntity<?> getRatingByOthers(@PathVariable Long userId) {
        try {
            Map<SportField, Double> ratingOverallByOthers = ratingService.getRatingByOthers(userId);
            return ResponseEntity.ok(ratingOverallByOthers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/getOverallRating/{userId}")
    public ResponseEntity<?> getOverallRating(@PathVariable Long userId) {
        try {
            Map<SportField, Double> overallRating = ratingService.getOverallRating(userId);
            return ResponseEntity.ok(overallRating);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @GetMapping("/getOrganizationRating/{userId}")
    public ResponseEntity<?> getOrganizationRating(@PathVariable Long userId) {
        try {
            Map<SportField, Double> organizationRating = ratingService.getOrganizationRating(userId);
            return ResponseEntity.ok(organizationRating);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}
