package com.dia.deliveryfront.store.dto;

import lombok.Getter;

@Getter
public class StoreUpdateRequestDto {
    private String name;
    private String introduction;
    private String imageUrl;
    private String category;

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}