package com.dia.deliveryfront.store.controller;

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

    // 가게 등록 페이지
    @GetMapping("/add")
    public String storeAdd() {
        return "store/storeAdd";
    }

}
