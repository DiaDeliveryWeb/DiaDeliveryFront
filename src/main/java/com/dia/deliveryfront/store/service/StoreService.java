package com.dia.deliveryfront.store.service;


import com.dia.deliveryfront.common.image.ImageUploader;
import com.dia.deliveryfront.store.dto.StoreCreateResponseDto;
import com.dia.deliveryfront.store.dto.StoreRequestDto;
import com.dia.deliveryfront.store.entity.Stores;
import com.dia.deliveryfront.store.repository.StoreRepository;
import com.dia.deliveryfront.user.entity.Users;
import com.dia.deliveryfront.user.respository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class StoreService {
    private final RestTemplate restTemplate;

    @Value("${server.back.address}") // 백엔드 서버 주소
    private String serverAddress;

    public StoreService(RestTemplateBuilder builder, UserRepository userRepository, StoreRepository storeRepository, ImageUploader imageUploader) {
        this.restTemplate = builder.build();
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
        this.imageUploader = imageUploader;
    }

    private final UserRepository userRepository;

    private final StoreRepository storeRepository;
    private final ImageUploader imageUploader;
    @Transactional
    public ResponseEntity<StoreCreateResponseDto> createStore(StoreRequestDto requestDto, MultipartFile storeImage, List<MultipartFile> productsImage, Users user) throws IOException {
        Optional<Users> opUser = userRepository.findByUsername("Robbie");
        user = opUser.get();

        if (!user.getRole().getAuthority().equals("ROLE_ADMIN") && !user.getRole().getAuthority().equals("ROLE_OWNER")) {
            throw new IllegalArgumentException("소유자, 관리자만 가게를 등록할 수 있습니다.");
        }
        if (storeImage != null) {
            String imageUrl = imageUploader.upload(storeImage, "image");
            requestDto.setImageUrl(imageUrl);
        }
        if (productsImage != null){
            for (int i = 0; i<productsImage.size(); i++){
                String imageUrl = imageUploader.upload(productsImage.get(i), "image");
                requestDto.getProductList().get(i).setImageUrl(imageUrl);
            }
        }
        Stores store = new Stores(requestDto, user);
        System.out.println(store.getImageUrl());
//        store.addOneProductList(requestDto);
        storeRepository.save(store);
        StoreCreateResponseDto storeCreateResponseDto = new StoreCreateResponseDto(store);
        return new ResponseEntity<>(storeCreateResponseDto, HttpStatus.OK);
    }
}
