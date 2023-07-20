package com.dia.deliveryfront.store.controller;

import com.dia.deliveryfront.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
