package com.dia.deliveryfront.user.controller;

import com.dia.deliveryfront.user.dto.AuthRequestDto;
import com.dia.deliveryfront.user.dto.SignUpRequestDto;
import com.dia.deliveryfront.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public String profilePage() {
        return "user/profile";
    }

    /*
     * 회원 가입
     *
     */
    @PostMapping("/signup")
    public String signup(@Valid SignUpRequestDto requestDto, BindingResult bindingResult) {
        // Validation 예외처리
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        if(fieldErrors.size() > 0) {
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                log.error(fieldError.getField() + " 필드 : " + fieldError.getDefaultMessage());
            }
            return "redirect:/user/signup";
        }

        userService.signup(requestDto);

        return "redirect:/user/login-page";
    }

    // 회원 관련 정보 받기 토큰을 서버로 넘겨야함
    @GetMapping("/user-info")
    @ResponseBody
    public AuthRequestDto getUserInfo(String auth) {
        AuthRequestDto responseDto = userService.getUserInfo(auth);

        return responseDto;
    }

}
