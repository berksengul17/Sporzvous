package com.sporzvous.backend.Rating;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FilterState {
    private String sport;
    private LocalDate date;
    private Integer score;
    private RatingCategory category;
}