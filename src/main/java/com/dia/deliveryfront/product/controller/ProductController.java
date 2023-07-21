package com.dia.deliveryfront.product.controller;

import com.dia.deliveryfront.product.dto.ProductResponseDto;
import com.dia.deliveryfront.product.service.ProductService;
import com.dia.deliveryfront.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final StoreService storeService;
    @GetMapping("/mystore")
    public String myStoreDetail(@RequestParam String name, Model model) {
        //ProductResponseDto productResponseDto= productService.getProduct(name);
        //model.addAttribute("products",productResponseDto);
        return "user/myStoreDetail";
    }
}
