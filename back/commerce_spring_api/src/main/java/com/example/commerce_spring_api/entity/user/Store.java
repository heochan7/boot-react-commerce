package com.example.commerce_spring_api.entity.user;

import com.example.commerce_spring_api.entity.base.BaseEntity;
import com.example.commerce_spring_api.entity.user.enums.StoreStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stores")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Store extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // user 참조

    @Column(nullable = false)
    private String businessName; // 상표명

    @Column(nullable = false)
    private String business_number; // 사업자 번호

    private StoreStatus status = StoreStatus.PENDING;
}
