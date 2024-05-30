package com.sporzvous.backend.User;

import org.springframework.core.io.ClassPathResource;
import java.io.IOException;
import java.nio.file.Files;

public class ImageUtils {

    public static byte[] getDefaultProfileImage() throws IOException {
        ClassPathResource imgFile = new ClassPathResource("static/default-profile-photo.jpg");
        return Files.readAllBytes(imgFile.getFile().toPath());
    }
}
