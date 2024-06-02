package com.sporzvous.backend.User;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.Feedback.Feedback;
import com.sporzvous.backend.Feedback.FeedbackService;
import com.sporzvous.backend.MailSender.MailSenderService;
import com.sporzvous.backend.Rating.Rating;
import com.sporzvous.backend.Rating.RatingCategory;
import com.sporzvous.backend.Rating.RatingService;
import com.sporzvous.backend.Rating.SportField;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final FeedbackService feedbackService;
    private final RatingService ratingService;
    private final MailSenderService mailSenderService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(HttpServletRequest request, @RequestBody User userInfo) {
        try {
            User newUser = userService.signUp(userInfo);
            String token = UUID.randomUUID().toString();
            userService.createTokenForUser(newUser, token);
//            mailSenderService.sendVerificationEmail(request, token, newUser);
            return ResponseEntity.ok(newUser);
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {
        UserDTO loggedInUser = userService.login(request);
        if(loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Email or password is wrong or empty");
        }
    }

//    @PostMapping("/resetPassword")
//    public ResponseEntity<String> resetPassword(HttpServletRequest request,
//                                                @RequestParam String email) {
//        try {
//            User user = userService.findUserByEmail(email);
//            if (user == null) {
//                throw new IllegalArgumentException("User with email" + email + "is not found");
//            }
//            String token = UUID.randomUUID().toString();
//            userService.createTokenForUser(user, token);
//            mailSenderService.sendResetTokenEmail(request, token, user);
//            return ResponseEntity.ok("You should receive a password reset email shortly");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error " + e.getMessage());
//        }
//    }

    @PostMapping("/requestPasswordReset")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
        try {
            User user = userService.findUserByEmail(email);
            userService.sendVerificationCode(user);
            return ResponseEntity.ok("Verification code sent to email");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/verifyCode")
    public ResponseEntity<String> verifyCode(@RequestParam String email, @RequestParam String code) {
        if (userService.verifyCode(email, code)) {
            return ResponseEntity.ok("Code verified successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid code");
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestParam String email, @RequestParam String code, @RequestParam String newPassword) {
        if (userService.verifyCode(email, code)) {
            User user = userService.findUserByEmail(email);
            userService.changeUserPassword(user, newPassword);
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid code");
        }
    }



    @PostMapping("/addFeedback")
    public ResponseEntity<?> addFeedback(@RequestBody Feedback request) {
        try {

            if (request.getTitle().length() < 3 || request.getTitle().length() > 30) {
                return ResponseEntity.badRequest().body("Title must be between 3 and 30 characters.");
            } else if (request.getContent().length() < 20 || request.getContent().length() > 100) {
                return ResponseEntity.badRequest().body("Content capacity is exceeded");
            }

            if (request.getReporter() == null) {
                // Call createFeedback from service
                Feedback feedback = feedbackService.createFeedback(request);
                return ResponseEntity.status(HttpStatus.CREATED).body("Feedback with ID" + feedback.getFeedbackId() + "created successfully");
            } else {
                // Call createReport from service
                Feedback feedback = feedbackService.createReport(request);
                return ResponseEntity.status(HttpStatus.CREATED).body("Report with ID" + feedback.getFeedbackId() + "created successfully");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error " + e.getMessage());

        }
    }

    @GetMapping("/friends/{userId}")
    public ResponseEntity<?> getFriends(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userService.getFriends(userId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/addRating")
    public ResponseEntity<?> addComment(@RequestParam("category") RatingCategory category,
                                        @RequestParam("sportField") SportField sportField,
                                        @RequestParam("userRating") Double userRating,
                                        @RequestParam("content") String content,
                                        @RequestParam("senderId") Long senderId,
                                        @RequestParam("receiverId") Long receiverId) {
        try {
            if (content.length() < 10 || content.length() > 100) {
                return ResponseEntity.badRequest().body("Content capacity is exceeded");
            }
            else {
                Rating rating = ratingService.createRating(category, userRating, sportField,
                                                            content, senderId, receiverId);
                return ResponseEntity.status(HttpStatus.CREATED).body("Rating with ID" + rating.getRatingId() + "created successfully");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error " + e.getMessage());
        }

    }

    @PostMapping("{userId}/join/{eventId}")
    public ResponseEntity<?> joinEvent(@PathVariable Long userId, @PathVariable Long eventId) {
        try {
            Event event = userService.joinEvent(userId, eventId);
            return ResponseEntity.ok("User joined to event with id" + event.getEventId());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @DeleteMapping("{userId}/leave/{eventId}")
    public ResponseEntity<?> leaveEvent(@PathVariable Long userId, @PathVariable Long eventId) {
        try {
            Event event = userService.leaveEvent(userId, eventId);
            return ResponseEntity.ok("User left event with id " + event.getEventId());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{userId}/edit-profile")
    public ResponseEntity<String> updateUserProfile(@PathVariable Long userId, @RequestBody UserProfileUpdateDto profileUpdateDto) {
        try {
            User updatedUser = userService.updateProfile(userId, profileUpdateDto);
            return ResponseEntity.ok("User with id " + updatedUser.getUserId() + " updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }



//    @PostMapping("/createEvent")
//    public ResponseEntity<?> createEvent(@RequestParam("title")String title,
//                                         @RequestParam("sport")String sport,
//                                         @RequestParam("locationCity")String locationCity,
//                                         @RequestParam("locationDistrict")String locationDistrict,
//                                         @RequestParam("participants")Integer participants,
//                                         @RequestParam("teamNumber")Integer teamNumber,
//                                         @RequestParam("eventDate") LocalDate eventDate,
//                                         @RequestParam("eventTime") LocalDate eventTime,
//                                         @RequestParam("skillRating") Double skillRating) {
//
//
//    }
//
}
