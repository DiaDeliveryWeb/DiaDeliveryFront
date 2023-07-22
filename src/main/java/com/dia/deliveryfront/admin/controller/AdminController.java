package com.dia.deliveryfront.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
    @GetMapping("/admin")
    public String checkPage(Model model) {
        return "admin";
    }

    @GetMapping("/admin/home")
    public String mainPage(Model model) {
        return "adminMain";
    }
}
