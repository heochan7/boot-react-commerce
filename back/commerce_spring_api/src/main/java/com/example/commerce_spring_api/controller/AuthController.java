package com.example.commerce_spring_api.controller;

import com.example.commerce_spring_api.dto.LoginRequest;
import com.example.commerce_spring_api.dto.LoginResponse;
import com.example.commerce_spring_api.entity.user.User;
import com.example.commerce_spring_api.entity.user.enums.Role;
import com.example.commerce_spring_api.security.CustomUserDetail;
import com.example.commerce_spring_api.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
//        );
//
//        CustomUserDetail userDetail = (CustomUserDetail) authentication.getPrincipal();

//        String token = jwtProvider.generateToken(userDetail.getUsername(), userDetail.getUser().getRole());

//        User user = userDetail.getUser();

        String token = jwtProvider.generateToken(loginRequest.getEmail(), Role.USER);

        return ResponseEntity.ok(new LoginResponse(
                token,
                new User(1L,
                        "test",
                        "test@test.com",
                        Role.USER)
        ));
    }
}
