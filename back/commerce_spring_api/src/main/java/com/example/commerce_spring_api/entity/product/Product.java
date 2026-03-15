package com.example.commerce_spring_api.entity.product;

import com.example.commerce_spring_api.entity.product.enums.ProductStatus;
import com.example.commerce_spring_api.entity.user.Seller;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private Seller seller;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int price;

    private int stock = 0;

    private ProductStatus status = ProductStatus.ON_SALE;

    private String description;
}
