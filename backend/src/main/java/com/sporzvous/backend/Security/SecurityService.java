package com.sporzvous.backend.Security;

import com.sporzvous.backend.PasswordResetToken.PasswordResetToken;
import com.sporzvous.backend.PasswordResetToken.PasswordResetTokenService;
import com.sporzvous.backend.User.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
@AllArgsConstructor
public class SecurityService {

    private final UserService userService;
    private final PasswordResetTokenService passwordResetTokenService;

    public String validatePasswordResetToken(String token) {
        final PasswordResetToken passToken = passwordResetTokenService.getByToken(token);

        return !isTokenFound(passToken) ? "invalidToken"
                : isTokenExpired(passToken) ? "expired"
                : null;
    }

    private boolean isTokenFound(PasswordResetToken passToken) {
        return passToken != null;
    }

    private boolean isTokenExpired(PasswordResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpiryDate().before(cal.getTime());
    }
}
