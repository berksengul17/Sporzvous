package com.sporzvous.backend.Feedback;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
}
