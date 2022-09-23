package com.sustainable.sustainableapi.configs;


import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.model.enums.UserRole;
import com.sustainable.sustainableapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Class for initial filling the database.
 */
@Component
@PropertySource("classpath:application.properties")
public class DatabaseInitializer implements CommandLineRunner {

    private final String ADMIN_USER_NAME = "admin";
    private final String INITIAL_ADMIN_EMAIL = "admin@test.com";
    private final String INITIAL_ADMIN_PASSWORD = "123456";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DatabaseInitializer(
           final UserRepository userRepository,
           final PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        createAdminUserIfNotExists();
    }

    private void createAdminUserIfNotExists() {
        Optional<User> adminOptional = userRepository.findByUsername(ADMIN_USER_NAME);
        if (adminOptional.isEmpty()) {
            User admin = User.builder()
                    .username(ADMIN_USER_NAME)
                    .password(passwordEncoder.encode(INITIAL_ADMIN_PASSWORD))
                    .emailAddress(INITIAL_ADMIN_EMAIL)
                    .userRole(UserRole.ROLE_ADMIN)
                    .enabled(true)
                    .build();
            userRepository.save(admin);
        }
    }
}
