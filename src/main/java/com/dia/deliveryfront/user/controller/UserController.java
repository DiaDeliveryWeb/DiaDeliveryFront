package com.dia.deliveryfront.user.controller;

import com.dia.deliveryfront.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/login-page")
    public String loginPage() {
        return "user/login";
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "user/signup";
    }


    @GetMapping("/mypage")
    public String myPage() {
        return "user/mypage";
    }

    @GetMapping("/profile")
    public String profilePage(Model model) {
//        ProfileResponseDto profileResponseDto = userService.getProfile();
//        model.addAttribute("imageUrl", profileResponseDto.getProfilePic());
//        model.addAttribute("introduction", profileResponseDto.getIntroduction());
        return "user/profile";
    }

    /*
     * 회원 가입
     *
     */

}
