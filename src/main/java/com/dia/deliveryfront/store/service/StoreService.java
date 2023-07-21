package com.dia.deliveryfront.store.service;


import com.dia.deliveryfront.store.dto.StoreResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Slf4j
@Service
public class StoreService {
    private final RestTemplate restTemplate;

    @Value("${server.back.address}") // 백엔드 서버 주소
    private String serverAddress;

    public StoreService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public List<StoreResponseDto> getMyStore() {
        URI uri = UriComponentsBuilder
                .fromUriString(serverAddress)
                .path("/mystores")
                .encode()
                .build()
                .toUri();

        ResponseEntity<List<StoreResponseDto>> response = restTemplate.exchange(uri, HttpMethod.GET, null, new ParameterizedTypeReference<List<StoreResponseDto>>() {});
        List<StoreResponseDto> list = response.getBody();

        return list;
    }

}
