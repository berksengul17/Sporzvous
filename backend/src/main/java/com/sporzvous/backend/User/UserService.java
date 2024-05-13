package com.sporzvous.backend.User;

import com.sporzvous.backend.PasswordResetToken.PasswordResetToken;
import com.sporzvous.backend.PasswordResetToken.PasswordResetTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

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

    public User findUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void createPasswordResetTokenForUser(User user, String token) {
        if (passwordResetTokenRepository.findByUser(user).isPresent()) {
            passwordResetTokenRepository.deleteByUser(user);
        }

        passwordResetTokenRepository.save(new PasswordResetToken(token, user));
    }
    public void changeUserPassword(User user, String password) {
        user.setPassword(password);
        userRepository.save(user);
    }
    public Optional<User> getUserByPasswordResetToken(String token) {
        return Optional.ofNullable(passwordResetTokenRepository.findByToken(token).getUser());
    }

    private boolean isValidEmail(String emailAddress) {
        return Pattern.compile("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")
                .matcher(emailAddress)
                .matches();
    }
}
