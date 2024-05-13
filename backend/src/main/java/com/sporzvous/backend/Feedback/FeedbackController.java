package com.sporzvous.backend.Feedback;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feedback")
@AllArgsConstructor

public class FeedbackController {
    private final FeedbackService feedbackService;
}
