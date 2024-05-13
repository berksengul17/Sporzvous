package com.sporzvous.backend.MailSender;

import com.sporzvous.backend.User.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MailSenderService {

    private final JavaMailSender mailSender;
    private final Environment env;

    public void sendVerificationEmail(HttpServletRequest request, String token, User user) {
        mailSender.send(constructVerificationEmail(getAppUrl(request), token, user));
    }

    public void sendResetTokenEmail(HttpServletRequest request, String token, User user) {
        mailSender.send(constructResetTokenEmail(getAppUrl(request), token, user));
    }

    private SimpleMailMessage constructVerificationEmail(String appUrl, String token, User user) {
        String url = appUrl + "/security/user/verify?token=" + token;
        return constructEmail("Verify your account", "Verify your account \r\n" + url, user);
    }

    public SimpleMailMessage constructResetTokenEmail(
            String contextPath, String token, User user) {
        String url = contextPath + "/security/user/changePassword?token=" + token;
        return constructEmail("Reset Password", "Reset password \r\n" + url, user);
    }

    public SimpleMailMessage constructEmail(String subject, String body,
                                             User user) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(user.getEmail());
        email.setFrom(env.getProperty("support.email"));
        return email;
    }

    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
}
