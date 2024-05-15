package com.sporzvous.backend.Rating;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class RatingService {
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;

    public List<Rating> filterRatings(FilterState filterState) {
        return ratingRepository.filterRatings(
                filterState.getSport(),
                filterState.getDate(),
                filterState.getScore() != null ? filterState.getScore() : 0,
                filterState.getCategory()
        );
    }
    public Rating createRating(Double userRating, SportField sportField, String content, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Rating rating = new Rating(userRating, sportField, content, user);
        return ratingRepository.save(rating);
    }
}
