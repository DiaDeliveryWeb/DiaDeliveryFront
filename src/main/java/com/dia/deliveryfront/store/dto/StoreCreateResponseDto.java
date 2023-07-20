package com.dia.deliveryfront.store.dto;

import com.dia.deliveryfront.product.dto.ProductResponseDto;
import lombok.Getter;

import java.util.List;

@Getter
public class StoreCreateResponseDto { // 가게 등록 ResponseDto
    private String name;
    private String introduction;
    private String imageUrl;
    private String category;
    private List<ProductResponseDto> productList;
}
