package com.dia.deliveryfront.store.dto;

import com.dia.deliveryfront.product.dto.ProductResponseDto;
import com.dia.deliveryfront.store.entity.Stores;
import lombok.Getter;

import java.util.List;

@Getter
public class StoreCreateResponseDto { // 가게 등록 ResponseDto
    private String name;
    private String introduction;
    private String imageUrl;
    private String category;
    private List<ProductResponseDto> productList;

    public StoreCreateResponseDto(Stores store) {
        this.name = store.getName();
        this.introduction = store.getIntroduction();
        this.imageUrl = store.getImageUrl();
        this.category = store.getCategory();
        this.productList = store.getProductsList().stream().map(ProductResponseDto::new).toList();
    }
}
