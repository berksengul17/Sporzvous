package com.sporzvous.backend.User;

import com.sporzvous.backend.MailSender.MailSenderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@Controller
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final MailSenderService mailSenderService;

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(HttpServletRequest request, @RequestBody User userInfo) {
        try {
            User newUser = userService.signUp(userInfo);
            String token = UUID.randomUUID().toString();
            userService.createTokenForUser(newUser, token);
            mailSenderService.sendVerificationEmail(request, token, newUser);
            return ResponseEntity.ok(newUser.getUsername() + " signed up successfully. Verify your email address to login.");
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {
        User loggedInUser = userService.login(request);
        if(loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Email or password is wrong");
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(HttpServletRequest request,
                                                @RequestParam String email) {
        User user = userService.findUserByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User with email" + email + "is not found");
        }
        String token = UUID.randomUUID().toString();
        userService.createTokenForUser(user, token);
        mailSenderService.sendResetTokenEmail(request, token, user);
        return ResponseEntity.ok("You should receive a password reset email shortly");
    }
}
