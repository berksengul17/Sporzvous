package com.sporzvous.backend.Security;

import lombok.Data;

@Data
public class PasswordDto {

    private String oldPassword;

    private  String token;
// validation will be made
    private String newPassword;
}
