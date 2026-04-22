package com.example.commerce_spring_api.controller;

import com.example.commerce_spring_api.dto.JoinRequest;
import com.example.commerce_spring_api.dto.JoinResponse;
import com.example.commerce_spring_api.dto.LoginRequest;
import com.example.commerce_spring_api.dto.LoginResponse;
import com.example.commerce_spring_api.entity.user.User;
import com.example.commerce_spring_api.entity.user.enums.Role;
import com.example.commerce_spring_api.security.CustomUserDetail;
import com.example.commerce_spring_api.security.JwtProvider;
import com.example.commerce_spring_api.service.AuthService;
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
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

        // 로그인 요청이 들어오면 manager 가 내부함수로 인해 repository 에서 email 과 password 에 맞는 user 를 찾음
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        CustomUserDetail userDetail = (CustomUserDetail) authentication.getPrincipal();

        // 로그인 정보릁 토대로 token 생성 후 front 에 json 으로 return
        String token = jwtProvider.generateToken(userDetail.getUsername(), userDetail.getUser().getRole());

        User user = userDetail.getUser();

        return ResponseEntity.ok(new LoginResponse(token,user));
    }

    @PostMapping("/join")
    public ResponseEntity<JoinResponse> join(@RequestBody JoinRequest joinRequest){
        // 회원가입 요청
        JoinResponse response = authService.userRegister(joinRequest);
        return ResponseEntity.ok(response);
    }

}
