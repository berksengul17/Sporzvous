package com.sporzvous.backend.Token;

import com.sporzvous.backend.User.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Token findByToken(String token);
    Optional<Token> findByUser(User user);
    @Transactional
    void deleteByUser(User user);
}
