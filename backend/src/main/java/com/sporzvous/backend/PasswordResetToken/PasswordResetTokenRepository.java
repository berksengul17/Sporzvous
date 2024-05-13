package com.sporzvous.backend.PasswordResetToken;

import com.sporzvous.backend.User.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    PasswordResetToken findByToken(String token);
    Optional<PasswordResetToken> findByUser(User user);
    @Transactional
    void deleteByUser(User user);
}
