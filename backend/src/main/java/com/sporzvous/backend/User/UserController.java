package com.sporzvous.backend.User;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private final JavaMailSender mailSender;
    private final Environment env;

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody User request) {
        try {
            User newUser = userService.signUp(request);
            return ResponseEntity.ok(newUser.getUsername() + " signed up successfully");
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
        userService.createPasswordResetTokenForUser(user, token);
        mailSender.send(constructResetTokenEmail(getAppUrl(request), token, user));
        return ResponseEntity.ok("You should receive a password reset email shortly");
    }

    private SimpleMailMessage constructResetTokenEmail(
            String contextPath, String token, User user) {
        String url = contextPath + "/security/user/changePassword?token=" + token;
        return constructEmail("Reset Password", "Reset password \r\n" + url, user);
    }

    private SimpleMailMessage constructEmail(String subject, String body,
                                             User user) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(user.getEmail());
        email.setFrom(env.getProperty("support.email"));
        return email;
    }

    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
}
