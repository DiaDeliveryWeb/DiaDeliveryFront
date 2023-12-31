package com.dia.deliveryfront.store.dto;

import com.dia.deliveryfront.product.dto.ProductRequestDto;
import lombok.Getter;

import java.util.List;

@Getter
public class StoreRequestDto {
    private String name;
    private String introduction;
    private String imageUrl;
    private String category;
    private List<ProductRequestDto> productList;

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

}

