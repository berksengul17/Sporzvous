package com.sporzvous.backend.Rating;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@Controller
@RequestMapping("/api/ratings")
@AllArgsConstructor
public class RatingController {
    private final RatingService ratingService;

    @GetMapping("/filter")
    public ResponseEntity<?> filterRatings(@RequestParam(required = false) String sport,
                                           @RequestParam(required = false) LocalDate date,
                                           @RequestParam(required = false, defaultValue = "0") int score) {
        try {
            return ResponseEntity.ok(ratingService.filterRatings(sport, date, score));
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
