package com.sporzvous.backend.config;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private String defaultPhotoPath = "/static/default-profile-photo.jpg";

    @Override
    public void run(String... args) throws Exception {

        User user1 = new User(1L, "a@gmail.com", "123", "Berk Şengül", "bekirsama",
                "Turkey", 21, "Male", "Football");

        userRepository.save(user1);

        User user2 = new User(2L, "b@gmail.com", "123", "Gon Freecss", "gongon",
                "Japan", 12, "Male", "Volleyball");

        userRepository.save(user2);

    }
}
