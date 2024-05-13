package com.sporzvous.backend.Rating;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class RatingService {
    private final RatingRepository ratingRepository;

    public List<Rating> filterRatings(String sport, LocalDate date, int score) {
        return ratingRepository.filterRatings(sport, date, score);
    }
}
