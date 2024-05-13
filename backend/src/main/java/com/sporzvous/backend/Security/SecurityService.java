package com.sporzvous.backend.Security;

import com.sporzvous.backend.Token.Token;
import com.sporzvous.backend.Token.TokenService;
import com.sporzvous.backend.User.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
@AllArgsConstructor
public class SecurityService {

    private final TokenService tokenService;

    public String validatePasswordResetToken(String tokenData) {
        final Token token = tokenService.getByToken(tokenData);

        return !isTokenFound(token) ? "invalidToken"
                : isTokenExpired(token) ? "expired"
                : null;
    }

    private boolean isTokenFound(Token passToken) {
        return passToken != null;
    }

    private boolean isTokenExpired(Token passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpiryDate().before(cal.getTime());
    }
}
