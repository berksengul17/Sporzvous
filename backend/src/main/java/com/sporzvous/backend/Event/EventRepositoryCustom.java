package com.sporzvous.backend.Event;

import java.time.LocalDate;
import java.util.List;

public interface EventRepositoryCustom {
    List<Event> filterEvents(String sport, String locationCity, String locationDistrict,
                             LocalDate startDate, LocalDate endDate, int isEventOver, Long userId, double minRating);
}
