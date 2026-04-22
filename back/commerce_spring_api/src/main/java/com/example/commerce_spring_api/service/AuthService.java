package com.example.commerce_spring_api.service;

import com.example.commerce_spring_api.dto.JoinRequest;
import com.example.commerce_spring_api.dto.JoinResponse;
import com.example.commerce_spring_api.entity.user.User;
import com.example.commerce_spring_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public JoinResponse userRegister(JoinRequest request) {

        // 들어온 password decode
        String password = passwordEncoder.encode(request.getPassword());

        // 이메일이 존재할경우 register false return
        if(userRepository.existsByEmail(request.getEmail())){
            return new JoinResponse(false, "이미 사용중인 이메일 입니다.");
        }

        // user 객체 생성
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(password).build();

        userRepository.save(user);
        return new JoinResponse(true, "회원가입이 완료되었습니다.");
    }
}
