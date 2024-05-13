package com.sporzvous.backend.Rating;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RatingRepositoryCustomImpl implements RatingRepositoryCustom{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Rating> filterRatings(String sport, LocalDate date, int score) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Rating> query = cb.createQuery(Rating.class);
        Root<Rating> rating = query.from(Rating.class);

        List<Predicate> predicates = new ArrayList<>();

        if (sport != null && !sport.isEmpty()) {
            predicates.add(cb.equal(rating.get("field"), "sport"));
        }
        if (date != null) {
            predicates.add(cb.equal(rating.get("publishDate"), date.toString()));
        }
        predicates.add(cb.greaterThanOrEqualTo(rating.get("rating"), score));

        query.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(query).getResultList();
    }
}
