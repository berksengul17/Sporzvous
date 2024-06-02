package com.sporzvous.backend.User;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.Event.EventRepository;
import com.sporzvous.backend.Event.EventService;
import com.sporzvous.backend.FriendRequest.FriendRequestDTO;
import com.sporzvous.backend.Team.Team;
import com.sporzvous.backend.Token.Token;
import com.sporzvous.backend.Token.TokenRepository;
import com.sporzvous.backend.UserEvent.UserEventService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;

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


        return userRepository.save(new User(
                user.getEmail(),
                user.getPassword(),
                user.getUsername(),
                user.getCountry()
        ));
    }
    @Transactional
    public UserDTO login(User userCredentials) {
        Optional<User> user = userRepository.findByEmail(userCredentials.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(userCredentials.getPassword())) {
            User userInfo = user.get();
            List<FriendRequestDTO> receivedRequests = userInfo.getReceivedRequests().stream()
                    .map(req -> new FriendRequestDTO(req.getFriendRequestId(), req.getSender().getUserId(),
                            req.getSender().getFullName(), req.getFriendRequestStatus()))
                    .toList();

            return new UserDTO(
                    userInfo.getUserId(),
                    userInfo.getImageAsBase64(),
                    userInfo.getEmail(),
                    userInfo.getFullName(),
                    userInfo.getUsername(),
                    userInfo.getAge(),
                    userInfo.getGender(),
                    userInfo.getFavoriteSport(),
                    receivedRequests,
                    userInfo.getRatings(),
                    userInfo.getSportRatings()
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

        userEventService.createUserEvent(userId, eventId);
        return eventService.addUserToEvent(eventId, user);
    }

    @Transactional
    public Event leaveEvent(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with id " + userId + " not found"));

        userEventService.removeUserEvent(userId, eventId);
        return eventService.removeUserFromEvent(eventId, user);
    }

    public User updateProfile(Long userId, UserProfileUpdateDto profileUpdateDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with id " + userId + " not found"));

        if (profileUpdateDto.getUsername() != null && profileUpdateDto.getUsername().length() < 30 && profileUpdateDto.getUsername().length() > 2) {
            user.setUsername(profileUpdateDto.getUsername());
        } else {
            throw new IllegalArgumentException("User name should be between 2 and 30 characters while updating");
        }

        if (profileUpdateDto.getFullName() != null && (profileUpdateDto.getFullName().length() < 30 && profileUpdateDto.getFullName().length() > 2)) {
            user.setFullName(profileUpdateDto.getFullName());
        } else {
            throw new IllegalArgumentException("Fullname should be between 2 and 30 characters while updating");
        }

        if (profileUpdateDto.getAge() != null && profileUpdateDto.getAge() >= 18 ) {
            user.setAge(profileUpdateDto.getAge());
        } else {
            throw new IllegalArgumentException("Age should be equal or higher than 18 while updating");
        }

        if (!Objects.equals(profileUpdateDto.getGender(), "")) {
            user.setGender(profileUpdateDto.getGender());
        } else {
            throw new IllegalArgumentException("There is a problem with gender selection");
        }

        if (profileUpdateDto.getFavoriteSport() != null) {
            user.setFavoriteSport(profileUpdateDto.getFavoriteSport());
        }
//        if (profileUpdateDto.getFavoriteSport() != null)  {
//            user.setFavoriteSport(profileUpdateDto.getFavoriteSport());
//        } else {
//            throw new IllegalArgumentException("Favorite sport is not chosen while updating");
//        }
//
//        if (profileUpdateDto.getImage() != null) {
//            user.setImage(Base64.getDecoder().decode(profileUpdateDto.getImage()));
//        } else {
//            throw new IllegalArgumentException("There is a problem with image loading while updating");
//        }
//        if (profileUpdateDto.getMultipartFile() != null && !profileUpdateDto.getMultipartFile().isEmpty()) {
//            try {
//                byte[] imageBytes = profileUpdateDto.getMultipartFile().getBytes();
//                user.setImage(imageBytes);
//            } catch (IllegalArgumentException e) {
//                throw new IllegalArgumentException("Failed to decode profile picture");
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }

        return userRepository.save(user);
    }


    @Transactional
    public List<FriendDTO> getFriends(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return user.getFriends().stream().map(friend -> new FriendDTO(friend.getUserId(), friend.getEmail(),
                friend.getFullName(), friend.getUsername(), friend.getAge(), friend.getGender(),
                friend.getFavoriteSport()))
                .toList();
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
