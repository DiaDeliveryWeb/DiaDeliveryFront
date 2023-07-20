package com.dia.deliveryfront.user.service;

import com.dia.deliveryfront.order.dto.OrderResponseDto;
import com.dia.deliveryfront.user.dto.AuthRequestDto;
import com.dia.deliveryfront.user.dto.SignUpRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Slf4j
@Service
public class UserService {
    private final RestTemplate restTemplate;

    @Value("${server.back.address}") // 백엔드 서버 주소
    private String serverAddress;

    public UserService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public AuthRequestDto signup(SignUpRequestDto requestDto) {
        // 요청 URL 만들기
        URI uri = UriComponentsBuilder
                .fromUriString(serverAddress)
                .path("/users/signup")
                .encode()
                .build()
                .toUri();
        ResponseEntity<AuthRequestDto> responseEntity = restTemplate.postForEntity(uri, requestDto, AuthRequestDto.class);

        log.info("statusCode = " + responseEntity.getStatusCode());

        return responseEntity.getBody();

    }

    public AuthRequestDto getUserInfo(String auth) {
        // 요청 URL 만들기
        URI uri = UriComponentsBuilder
                .fromUriString(serverAddress)
                .path("/users/getUserInfo")
                .encode()
                .build()
                .expand(auth)
                .toUri();
        log.info("uri = " + uri);

        // User user = new User("Robbie", "1234");

        ResponseEntity<AuthRequestDto> responseEntity = restTemplate.postForEntity(uri, null, AuthRequestDto.class);

        log.info("statusCode = " + responseEntity.getStatusCode());

        return responseEntity.getBody();
    }

    public List<OrderResponseDto> findOrder(String token) {
        URI uri = UriComponentsBuilder
                .fromUriString(serverAddress)
                .path("/orders")
                .encode()
                .build()
                .toUri();
        log.info("uri = " + uri);
        System.out.println(token);
        // HttpHeaders 객체 생성
        HttpHeaders headers = new HttpHeaders();
        // 토큰 값을 "Authorization" 헤더에 추가
        headers.set("Authorization", token);
        ResponseEntity<List<OrderResponseDto>> responseEntity = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                // 헤더를 포함한 HttpEntity 객체 전달
                new HttpEntity<>(headers),
                new ParameterizedTypeReference<List<OrderResponseDto>>() {}
        );
        return responseEntity.getBody();
    }
}
