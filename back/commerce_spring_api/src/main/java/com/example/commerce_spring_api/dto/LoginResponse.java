package com.example.commerce_spring_api.dto;

import com.example.commerce_spring_api.entity.user.User;
import lombok.Getter;

@Getter
public class LoginResponse {
    private String token;
    private UserResponse user;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = new UserResponse(user);
    }
}
