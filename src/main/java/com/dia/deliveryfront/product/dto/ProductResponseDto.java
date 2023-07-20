package com.dia.deliveryfront.product.dto;

import lombok.Getter;

@Getter
public class ProductResponseDto {
    private Long id;
    private String imageUrl;
    private String productName;
    private int price;
    private String description;
}

