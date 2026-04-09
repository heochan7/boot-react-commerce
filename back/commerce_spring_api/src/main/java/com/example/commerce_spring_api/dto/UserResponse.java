package com.example.commerce_spring_api.dto;

import com.example.commerce_spring_api.entity.user.User;
import com.example.commerce_spring_api.entity.user.enums.Role;
import lombok.Getter;

@Getter
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole();
    }
}
