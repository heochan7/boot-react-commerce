package com.example.commerce_spring_api.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class JoinRequest {
    private String username;
    private String phone;
    private String email;
    private String password;
}
