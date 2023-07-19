package com.dia.deliveryfront.user.controller;


import com.dia.deliveryfront.user.UserRoleEnum;
import com.dia.deliveryfront.user.dto.AuthRequestDto;
import com.dia.deliveryfront.user.dto.SignUpRequestDto;
import com.dia.deliveryfront.user.dto.UserInfoDto;
import com.dia.deliveryfront.user.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Slf4j
public class RestUserController {

    private final UserService userService;
    public RestUserController(UserService userService) {
        this.userService = userService;
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
