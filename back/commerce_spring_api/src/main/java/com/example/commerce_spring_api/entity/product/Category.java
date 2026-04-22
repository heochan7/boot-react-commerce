package com.example.commerce_spring_api.entity.product;

import com.example.commerce_spring_api.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // pk id

    @Column(nullable = false)
    private String name; // category 이름

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent; // 상위 id ex) 상의에 대한 카테고리면 상의 id 값 참조

    @OneToMany(mappedBy = "parent")
    private List<Category> children = new ArrayList<>(); // 하위 category 값 참조
}
