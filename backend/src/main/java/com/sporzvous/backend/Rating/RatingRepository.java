package com.sporzvous.backend.Rating;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long>, RatingRepositoryCustom{
    Optional<List<Rating>> findByCategory(RatingCategory category);
    List<Rating> getRatingsBySenderAndEvent(User sender, Event event);
}
