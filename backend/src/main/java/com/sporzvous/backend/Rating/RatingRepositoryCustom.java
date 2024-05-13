package com.sporzvous.backend.Rating;

import java.time.LocalDate;
import java.util.List;

public interface RatingRepositoryCustom {
    List<Rating> filterRatings(String sport, LocalDate date, int score);
}
