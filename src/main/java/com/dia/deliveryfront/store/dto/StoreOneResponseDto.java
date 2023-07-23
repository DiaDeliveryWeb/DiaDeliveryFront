package com.dia.deliveryfront.store.dto;

import com.dia.deliveryfront.product.dto.ProductResponseDto;
import com.dia.deliveryfront.review.dto.ReviewResponseDto;
import lombok.Getter;

import java.util.List;

@Getter
public class StoreOneResponseDto {
    private Long storeId;
    private String name;
    private String introduction;
    private String imageUrl;
    private String category;

    private List<ProductResponseDto> productResponseDtoList;
    private List<ReviewResponseDto> reviewsList;
}
