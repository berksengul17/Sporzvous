package com.sporzvous.backend.User;

import com.sporzvous.backend.FriendRequest.FriendRequestDTO;
import com.sporzvous.backend.UserEvent.UserEventService;
import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.Event.EventRepository;
import com.sporzvous.backend.Event.EventService;
import com.sporzvous.backend.Token.Token;
import com.sporzvous.backend.Token.TokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EventService eventService;
    private final EventRepository eventRepository;
    private final UserEventService userEventService;

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with id " + userId + " not found"));
    }
    @Transactional
    public User signUp(User user) {
        boolean isEmailTaken = userRepository.findByEmail(user.getEmail()).isPresent();

        if (user.getImage() == null || user.getImage().length == 0) {
            try {
                user.setImage(ImageUtils.getDefaultProfileImage());
            } catch (IOException e) {
                e.printStackTrace();
                // Handle the exception appropriately in your application
            }
        }

        if (isEmailTaken) {
            throw new IllegalArgumentException("Email is already taken");
        } else if (userRepository.findByUsername(user.getUsername()).isPresent()){
            throw new IllegalArgumentException("Username is already taken");
        } else if (user.getUsername().length() > 30 || user.getUsername().length() < 2) {
            throw new IllegalArgumentException("User name should be between 2 and 30 characters");
        } else if (!isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("Invalid email address");
        } else if (!isValidPassword(user.getPassword())) {
            throw new IllegalArgumentException("Password must start with an uppercase letter, include a number and a symbol, and be between 8 and 16 characters long");
        }


        return userRepository.save(user);
    }

    public UserDTO login(User userCredentials) {
        Optional<User> user = userRepository.findByEmail(userCredentials.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(userCredentials.getPassword())) {
            User userInfo = user.get();
            List<FriendRequestDTO> receivedRequests = userInfo.getReceivedRequests().stream()
                    .map(req -> new FriendRequestDTO(req.getFriendRequestId(), req.getSender().getUserId(), req.getSender().getFullName(), req.getFriendRequestStatus()))
                    .collect(Collectors.toList());

            return new UserDTO(
                    userInfo.getUserId(),
                    userInfo.getEmail(),
                    userInfo.getFullName(),
                    userInfo.getUsername(),
                    userInfo.getAge(),
                    userInfo.getGender(),
                    userInfo.getFavoriteSport(),
                    receivedRequests
            );
        }

        return null;
    }

    public Event joinEvent(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        if (event.getUsers().size() == event.getMaxParticipants()) {
            throw new IllegalStateException("Event " + eventId + " is already at full capacity.");
        }
        userEventService.createUserEvent(user, event);
        return eventService.addUserToEvent(eventId, user);
    }


    public Event leaveEvent(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with id " + userId + " not found"));

        return eventService.removeUserFromEvent(eventId, user);
    }

    public User updateProfile(Long userId, UserProfileUpdateDto profileUpdateDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with id " + userId + " not found"));

        if (profileUpdateDto.getUsername() != null) {
            user.setUsername(profileUpdateDto.getUsername());
        }

        if (profileUpdateDto.getFullName() != null) {
            user.setFullName(profileUpdateDto.getFullName());
        }

        if (profileUpdateDto.getAge() != null) {
            user.setAge(profileUpdateDto.getAge());
        }

        if (profileUpdateDto.getGender() != null) {
            user.setGender(profileUpdateDto.getGender());
        }

        if (profileUpdateDto.getFavoriteSport() != null) {
            user.setFavoriteSport(profileUpdateDto.getFavoriteSport());
        }
        if (profileUpdateDto.getProfilePicture() != null && !profileUpdateDto.getProfilePicture().isEmpty()) {
            try {
                byte[] imageBytes = profileUpdateDto.getProfilePicture().getBytes();
                user.setImage(imageBytes);
            } catch (IOException e) {
                throw new IllegalArgumentException("Failed to upload profile picture");
            }
        }

        return userRepository.save(user);
    }

    public User findUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User findUserByUsername(String username) {

        if (userRepository.findByUsername(username).isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("There does not exist such a user "));
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

    private boolean isValidPassword(String password) {
        if (password == null || password.length() < 8 || password.length() > 16) {
            return false;
        }

        if (!Character.isUpperCase(password.charAt(0))) {
            return false;
        }

        boolean hasNumber = false;
        boolean hasSymbol = false;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                hasNumber = true;
            } else if (!Character.isLetterOrDigit(c)) {
                hasSymbol = true;
            }
        }

        return hasNumber && hasSymbol;
    }
}
