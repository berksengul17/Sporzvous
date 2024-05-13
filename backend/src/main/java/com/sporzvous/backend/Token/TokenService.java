package com.sporzvous.backend.Token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TokenService {

    private final TokenRepository passwordResetTokenRepository;

    public Token getByToken(String token) {
        return passwordResetTokenRepository.findByToken(token);

    }



}
