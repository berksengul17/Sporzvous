package com.sporzvous.backend.Rating;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.Event.EventRepository;
import com.sporzvous.backend.SportRating.SportRating;
import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RatingService {
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public List<Rating> filterRatings(FilterState filterState) {
        return ratingRepository.filterRatings(
                filterState.getSport(),
                filterState.getDate(),
                filterState.getScore() != null ? filterState.getScore() : 0,
                filterState.getCategory()
        );
    }
    public Rating createRating(RatingCategory category, Double userRating, SportField sportField,
                               String content, Long eventId, Long senderId, Long receiverId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Rating rating = new Rating(category, userRating, sportField, content, event, sender, receiver);
        return ratingRepository.save(rating);
    }

    public List<Long> getRatingsGivenByUserForEvent(Long userId, Long eventId) {
        User sender = userRepository.findById(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("User could not be found for " +
                                "getting ratings given by user for event"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                                new IllegalArgumentException("Event could not be found for " +
                                "getting ratings given by user for event"));

        return ratingRepository.getRatingsBySenderAndEvent(sender, event)
                                .stream()
                                .map(rating -> rating.getReceiver().getUserId())
                                .toList();
    }

    public List<Rating> getComments(Long userId) {
        User receiver = userRepository.findById(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("User could not be found for " +
                                "getting ratings given by user for event"));

        return ratingRepository.findByReceiver(receiver)
                .orElseThrow(() -> new IllegalArgumentException("Ratings could not found"));
    }

    public Map<SportField, Double> getRatingByOthers(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User could not found by getting rating by others"));

        // Group ratings by sport and calculate the average for each sport

        return user.getRatings().stream()
                .collect(Collectors.groupingBy(Rating::getSportField,
                        Collectors.averagingDouble(Rating::getRating)));
    }


    public Map<SportField, Double> getOverallRating(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User could not be found for getting rating by others"));

        // Fetch other users' ratings and filter by SPORT category
        Map<SportField, Double> otherUsersAverageRatings = user.getRatings().stream()
                .filter(rating -> rating.getCategory() == RatingCategory.SPORT)
                .collect(Collectors.groupingBy(Rating::getSportField,
                        Collectors.averagingDouble(Rating::getRating)));

        // Fetch self-ratings and filter by SPORT category
        Map<SportField, Double> selfRatings = user.getSportRatings().stream()
                .collect(Collectors.groupingBy(SportRating::getSportField,
                        Collectors.averagingDouble(SportRating::getRating)));

        // Combine ratings


        return otherUsersAverageRatings.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> {
                            SportField sportField = entry.getKey();
                            double otherUsersAverage = entry.getValue();
                            double selfRating = selfRatings.getOrDefault(sportField, 0.0);
                            return 0.6 * otherUsersAverage + 0.4 * selfRating;
                        }
                ));
    }

    public Map<SportField, Double> getOrganizationRating(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User could not be found for getting rating by others"));

        // Fetch ratings and filter by ORGANIZATION category

        return user.getRatings().stream()
                .filter(rating -> rating.getCategory() == RatingCategory.ORGANIZATION)
                .collect(Collectors.groupingBy(Rating::getSportField,
                        Collectors.averagingDouble(Rating::getRating)));
    }
}
