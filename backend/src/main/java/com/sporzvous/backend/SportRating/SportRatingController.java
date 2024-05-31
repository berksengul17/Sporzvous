package com.sporzvous.backend.SportRating;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/sportRating")
public class SportRatingController {
    private SportRatingService sportRatingService;


    @PostMapping("/initializeSportRatings/{userId}")
    public ResponseEntity<String> initializeSportRating(@RequestBody List<SportRating> sportRatings, @PathVariable Long userId) {
        try {
            sportRatingService.createSportRating(sportRatings, userId);
            return ResponseEntity.ok("Ratings are added to " + userId );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error" + e.getMessage());
        }

    }

}
