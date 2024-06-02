package com.sporzvous.backend.Event;

import com.sporzvous.backend.User.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class EventRepositoryCustomImpl implements EventRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Event> filterEvents(String sport, String locationCity, String locationDistrict,
                                    LocalDate startDate, LocalDate endDate, int isEventOver, Long userId, double minRating) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Event> query = cb.createQuery(Event.class);
        Root<Event> event = query.from(Event.class);

        List<Predicate> predicates = new ArrayList<>();

        if (sport != null && !sport.isEmpty()) {
            predicates.add(cb.equal(event.get("sport"), sport));
        }
        if (locationCity != null && !locationCity.isEmpty()) {
            predicates.add(cb.equal(event.get("locationCity"), locationCity));
        }
        if (locationDistrict != null && !locationDistrict.isEmpty()) {
            predicates.add(cb.equal(event.get("locationDistrict"), locationDistrict));
        }
        if (startDate != null && endDate != null) {
            predicates.add(cb.greaterThanOrEqualTo(event.get("eventDate"), startDate));
            predicates.add(cb.lessThanOrEqualTo(event.get("eventDate"), endDate));
        }
        predicates.add(cb.equal(event.get("isEventOver"), isEventOver));
        if (minRating > 0) {
            predicates.add(cb.greaterThanOrEqualTo(event.get("skillRating"), minRating));
        }
//        if (userId != null) {
//            Join<Event, User> users = event.join("users", JoinType.LEFT);
//            predicates.add(cb.equal(users.get("id"), userId));
//        }

        query.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(query).getResultList();
    }
}
