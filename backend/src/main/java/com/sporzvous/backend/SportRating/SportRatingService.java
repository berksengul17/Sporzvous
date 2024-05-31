package com.sporzvous.backend.SportRating;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SportRatingService {

    private final SportRatingRepository sportRatingRepository;
    private final UserRepository userRepository;

    public List<SportRating> createSportRating(List<SportRating> sportRatings, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("A problem occurred while creating sport rating"));

        List<SportRating> ratings = new ArrayList<>();
        for (SportRating sportRating : sportRatings) {
            SportRating newSportRating = new SportRating( sportRating.getSportName(), sportRating.getRating(), user);
            ratings.add(sportRatingRepository.save(newSportRating));
        }
        return ratings;
    }
}
