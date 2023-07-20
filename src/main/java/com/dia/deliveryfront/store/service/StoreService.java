package com.dia.deliveryfront.store.service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class StoreService {
    private final RestTemplate restTemplate;

    @Value("${server.back.address}") // 백엔드 서버 주소
    private String serverAddress;

    public StoreService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

}
