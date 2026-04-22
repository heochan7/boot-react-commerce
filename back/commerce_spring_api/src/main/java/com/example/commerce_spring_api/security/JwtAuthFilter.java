package com.example.commerce_spring_api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
// jwt filter 재정의
public class JwtAuthFilter extends OncePerRequestFilter {
    private static final String DELIMS = " ";
    private final JwtProvider jwtProvider;

    // ip 확인, 로그인 확인, jwt 검사
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("Authorization header = {}", authorization);

        String accessToken = resolveToken(authorization);
        if(StringUtils.hasText(accessToken) && jwtProvider.validateToken(accessToken)){
            Authentication authentication = jwtProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("인증 성공: {}, 권한 : {}", authentication.getName(), authentication.getAuthorities());
        }else {
            log.info("토큰이 error {}", accessToken);
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(String authorization) {
        if (StringUtils.hasText(authorization) && authorization.startsWith("Bearer ")) {
            return authorization.substring(7); // "Bearer " 이후의 문자열만 추출
        }
        return null;
    }
}
