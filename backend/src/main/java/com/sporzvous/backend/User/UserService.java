package com.sporzvous.backend.User;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.Event.EventRepository;
import com.sporzvous.backend.Event.EventService;
import com.sporzvous.backend.Token.Token;
import com.sporzvous.backend.Token.TokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EventService eventService;

    public User signUp(User user) {
        boolean isEmailTaken = userRepository.findByEmail(user.getEmail()).isPresent();

        if (isEmailTaken) {
            throw new IllegalArgumentException("Email is already taken");
        } else if (!isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("Invalid email address");
        } else if (user.getUsername().length() > 30 || user.getUsername().length() < 2) {
            throw new IllegalArgumentException("User name should be between 2 and 30 characters");
        }

        return userRepository.save(user);
    }

    public User login(User userCredentials) {
        Optional<User> user = userRepository.findByEmail(userCredentials.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(userCredentials.getPassword())) {
            User userInfo = user.get();
            return new User(userInfo.getUserId(), userInfo.getEmail(), userInfo.getUsername());
        }

        return null;
    }

    public Event joinEvent(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return eventService.addUserToEvent(eventId, user);
    }

    public User findUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void createTokenForUser(User user, String token) {
        if (tokenRepository.findByUser(user).isPresent()) {
            tokenRepository.deleteByUser(user);
        }

        tokenRepository.save(new Token(token, user));
    }
    public void changeUserPassword(User user, String password) {
        user.setPassword(password);
        userRepository.save(user);
    }
    public Optional<User> getUserByPasswordResetToken(String token) {
        return Optional.ofNullable(tokenRepository.findByToken(token).getUser());
    }

    private boolean isValidEmail(String emailAddress) {
        return Pattern.compile("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")
                .matcher(emailAddress)
                .matches();
    }
}
