package com.dia.deliveryfront.order.controller;

import com.dia.deliveryfront.order.service.OrderService;
import com.dia.deliveryfront.product.dto.ProductResponseDto;
import com.dia.deliveryfront.review.dto.ReviewResponseDto;
import com.dia.deliveryfront.store.dto.StoreOneResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;
    // 주문 페이지
    @GetMapping("/save")
    public String storeAdd(@RequestParam String name, Model model) {
        StoreOneResponseDto storeOneResponseDto = orderService.getStore(name);
        List<ReviewResponseDto> reviewResponseDtos = storeOneResponseDto.getReviewsList();
        List<ProductResponseDto> productResponseDtos = storeOneResponseDto.getProductResponseDtoList();
        model.addAttribute("store", storeOneResponseDto);
        model.addAttribute("reviews", reviewResponseDtos);
        model.addAttribute("products", productResponseDtos);
        return "order/orderSave";
    }

}
