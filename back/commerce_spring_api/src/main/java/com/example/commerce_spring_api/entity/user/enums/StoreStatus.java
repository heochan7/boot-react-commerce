package com.example.commerce_spring_api.entity.user.enums;

public enum StoreStatus {
    PENDING,   // 승인 대기 (가입 직후)
    OPEN,      // 영업 중 (관리자 승인 완료)
    SUSPENDED, // 정지 (규정 위반 등)
    CLOSED     // 폐업
}
