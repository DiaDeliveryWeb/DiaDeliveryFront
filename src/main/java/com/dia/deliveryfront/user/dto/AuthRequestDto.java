package com.dia.deliveryfront.user.dto;

import com.dia.deliveryfront.user.UserRoleEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequestDto {
    private String username;

    private String password;

    private String email;

    private Integer point;

    private UserRoleEnum role; // 회원 권한 (ADMIN,OWNER, USER)

    private boolean owner = false;
    private boolean admin = false;

    private String adminToken = "";
    private String ownerToken = "";
}
