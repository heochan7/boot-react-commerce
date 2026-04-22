package com.example.commerce_spring_api.security;

import com.example.commerce_spring_api.entity.user.enums.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Component
public class JwtProvider {

    private final SecretKey key;
    private final long expiration;

    public JwtProvider(@Value("${jwt.secret}") String secret,
                       @Value("${jwt.expiration}") long expiration) {
        // 비밀키를 byte 배열로 변환하여 HMAC-SHA 알고리즘에 적합한 SecretKey 생성
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.expiration = expiration;
    }

    /**
     * 유저 정보를 바탕으로 JWT 토큰 생성
     */
    public String generateToken(String username, Role role) {
        Date now = new Date();
        return Jwts.builder()
                .subject(username)                 // 유저 식별값 (ID 등)
                .claim("role", role.name())               // 권한 정보 추가 (예: ROLE_USER)
                .issuer("board-application")       // 발행자 정보
                .issuedAt(now)                     // 발행 시간
                .expiration(new Date(now.getTime() + expiration)) // 만료 시간
                .signWith(key)                     // 암호화 키 설정
                .compact();
    }

    /**
     * 토큰의 유효성 검증
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // 서명이 다르거나, 만료되었거나, 형식이 잘못된 경우 false 반환
            return false;
        }
    }

    /**
     * 토큰에서 정보를 꺼내 SecurityContext에 저장할 Authentication 객체 생성
     */
    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);

        String username = claims.getSubject();
        String role = claims.get("role", String.class);

        if (role == null) {
            throw new JwtException("토큰에 권한 정보가 없습니다.");
        }
        String grantedRole = role.startsWith("ROLE_") ? role : "ROLE_" + role;

        List<SimpleGrantedAuthority> authorities =
                Collections.singletonList(new SimpleGrantedAuthority(grantedRole));

        return new UsernamePasswordAuthenticationToken(username, null, authorities);
    }

    /**
     * 토큰 내부의 모든 Payload(Claims)를 추출하는 공통 함수
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}