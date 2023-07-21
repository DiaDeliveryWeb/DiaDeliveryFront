package com.dia.deliveryfront.store.controller;

import com.dia.deliveryfront.order.service.OrderService;
import com.dia.deliveryfront.product.dto.ProductResponseDto;
import com.dia.deliveryfront.review.dto.ReviewResponseDto;
import com.dia.deliveryfront.store.dto.StoreOneResponseDto;
import com.dia.deliveryfront.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/stores")
public class StoreController {

    public final StoreService storeService;
    private final OrderService orderService;

    // 가게 등록 페이지
    @GetMapping("/save")
    public String storeAdd() {
        return "store/storeSave";
    }


    // 가게 목록 페이지
    @GetMapping("/mystoreslist")
    public String myStores(Model model) {

        return "store/myStoreList";
    }

    // 가게 상세 페이지
    @GetMapping("/mystores")
    public String myStores(@RequestParam String storeName, Model model) {
        String decodeStoreName =  URLDecoder.decode(storeName, StandardCharsets.UTF_8);
        model.addAttribute("storeName", decodeStoreName);
        StoreOneResponseDto storeOneResponseDto = orderService.getStore(decodeStoreName);
        List<ReviewResponseDto> reviewResponseDtos = storeOneResponseDto.getReviewsList();
        List<ProductResponseDto> productResponseDtos = storeOneResponseDto.getProductResponseDtoList();
        model.addAttribute("store", storeOneResponseDto);
        model.addAttribute("reviews", reviewResponseDtos);
        model.addAttribute("products", productResponseDtos);
        return "store/myStore";
    }
}
