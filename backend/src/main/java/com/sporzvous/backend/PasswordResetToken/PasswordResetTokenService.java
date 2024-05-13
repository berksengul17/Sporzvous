package com.sporzvous.backend.PasswordResetToken;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public PasswordResetToken getByToken(String token) {
        return passwordResetTokenRepository.findByToken(token);

    }



}
