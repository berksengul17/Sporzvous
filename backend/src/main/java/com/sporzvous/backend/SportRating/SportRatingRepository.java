package com.sporzvous.backend.SportRating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SportRatingRepository extends JpaRepository<SportRating, Long> {
}
