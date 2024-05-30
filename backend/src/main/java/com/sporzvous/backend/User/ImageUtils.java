package com.sporzvous.backend.User;

import java.io.IOException;
import java.io.InputStream;

public class ImageUtils {

    public static byte[] loadDefaultImage() {
        try {
            InputStream is = ImageUtils.class.getResourceAsStream("/static/default-profile-photo.png");
            assert is != null;
            return is.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException("Failed to load default image", e);
        }
    }
}
