package com.dia.deliveryfront.order.dto;

import com.dia.deliveryfront.order.OrderStatus;
import com.dia.deliveryfront.product.dto.ProductResponseDto;
import com.dia.deliveryfront.review.dto.ReviewResponseDto;
import lombok.Getter;

import java.util.List;

@Getter
public class OrderResponseDto {
    private String orderId;
    private String storeName;
    private List<ProductResponseDto> productResponseDtos;
    private ReviewResponseDto review;
    private String username;
    private OrderStatus orderStatus;
}
