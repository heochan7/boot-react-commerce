package com.example.commerce_spring_api.security;

import com.example.commerce_spring_api.entity.user.User;
import com.example.commerce_spring_api.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailService implements UserDetailsService {
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).
                orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다."));
        return new CustomUserDetail(user);
    }
}
