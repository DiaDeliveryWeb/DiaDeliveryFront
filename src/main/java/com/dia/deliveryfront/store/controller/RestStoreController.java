package com.dia.deliveryfront.store.controller;

import com.dia.deliveryfront.store.dto.StoreCreateResponseDto;
import com.dia.deliveryfront.store.dto.StoreRequestDto;
import com.dia.deliveryfront.store.service.StoreService;
import com.dia.deliveryfront.user.entity.Users;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
public class RestStoreController {
    public final StoreService storeService;

    // 가게 등록
    @PostMapping(value = "/stores", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<StoreCreateResponseDto> createStore(@RequestPart StoreRequestDto requestDto,
                                                              @RequestPart(required = false) List<MultipartFile> productsImage,
                                                              @RequestPart(required = false) MultipartFile storeImage) throws IOException
    {
        Users user = new Users();
        user.setUsername("김태훈");
        user.setId(1L);

        return storeService.createStore(requestDto, storeImage, productsImage, user);
    }
}
