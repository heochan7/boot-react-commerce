package com.example.commerce_spring_api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Address extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String recipientName;

    @Column(nullable = false)
    private String zipCode;

    @Column(nullable = false)
    private String baseAddress;

    private String detailAddress;

    private Boolean isDefault = false;
}
