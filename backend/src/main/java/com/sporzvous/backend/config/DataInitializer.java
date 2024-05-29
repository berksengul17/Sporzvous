package com.sporzvous.backend.config;

import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import com.sporzvous.backend.User.UserStatus;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        userRepository.save(new User(1L, "a@gmail.com", "123", "Berk Şengül", "bekirsama",
                                    "Turkey", 21, "Male", "Football", 12));

        userRepository.save(new User(2L, "b@gmail.com", "123", "Gon Freecss", "gongon",
                "Japan", 12, "Male", "Volleyball", 120));

    }
}
