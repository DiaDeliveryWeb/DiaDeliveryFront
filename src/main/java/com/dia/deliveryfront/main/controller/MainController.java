package com.dia.deliveryfront.main.controller;

import com.dia.deliveryfront.main.service.MainService;
import com.dia.deliveryfront.store.dto.StoreResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MainController {
    private final MainService mainService;
    @GetMapping("/")
    public String main(Model model) {
        List<StoreResponseDto> storeResponseDtos = mainService.getAllStores();
        model.addAttribute("storeList", storeResponseDtos);
        return "main";
    }
    @GetMapping("/category")
    public String category(Model model, @RequestParam String name) {
        List<StoreResponseDto> storeResponseDtos = mainService.getAllStoresByCategory(name);
        model.addAttribute("storeList", storeResponseDtos);
        return "main";
    }
}
