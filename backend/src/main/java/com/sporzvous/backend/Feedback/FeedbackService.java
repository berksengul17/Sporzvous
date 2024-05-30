package com.sporzvous.backend.Feedback;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    public Feedback createFeedback(Feedback feedback) {
        User reporter = userRepository.findById(feedback.getReporter().getUserId())
                .orElseThrow(() -> new RuntimeException("Reporter not found"));
        User reportedUser = userRepository.findByUsername(feedback.getReportedUser().getUsername())
                .orElseThrow(() -> new RuntimeException("Reported user not found"));

        feedback.setReporter(reporter);
        feedback.setReportedUser(reportedUser);
        feedback.setCreatedAt(LocalDateTime.now());
        return feedbackRepository.save(feedback);
    }

    public Feedback createReport(Feedback feedback) {

        User user = userRepository.findById(feedback.getFeedbackId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return feedbackRepository.save(feedback);
    }
}
