package com.example.commerce_spring_api.dto;

import com.example.commerce_spring_api.entity.user.User;
import com.example.commerce_spring_api.entity.user.enums.Role;
import lombok.Getter;

@Getter
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String role;

    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole().name();
    }
}
