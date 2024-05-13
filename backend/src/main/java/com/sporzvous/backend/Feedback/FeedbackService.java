package com.sporzvous.backend.Feedback;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback createReport(Feedback feedback) {

        User user = userRepository.findById(feedback.getFeedbackId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return feedbackRepository.save(feedback);
    }
}
