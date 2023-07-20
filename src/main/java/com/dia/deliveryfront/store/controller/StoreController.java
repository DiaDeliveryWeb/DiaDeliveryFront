package com.dia.deliveryfront.store.controller;

import com.dia.deliveryfront.store.dto.StoreCreateResponseDto;
import com.dia.deliveryfront.store.dto.StoreRequestDto;
import com.dia.deliveryfront.store.service.StoreService;
import com.dia.deliveryfront.user.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/stores")
public class StoreController {

    public final StoreService storeService;

    // 가게 등록 페이지
    @GetMapping("/save")
    public String storeAdd() {
        return "store/storeSave";
    }

}
