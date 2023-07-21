package com.dia.deliveryfront.main.service;

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
public class MainService {
    private final RestTemplate restTemplate;

    @Value("${server.back.address}") // 백엔드 서버 주소
    private String serverAddress;

    public MainService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public List<StoreResponseDto> getAllStores() {
        URI uri = UriComponentsBuilder
                .fromUriString(serverAddress)
                .path("/stores")
                .encode()
                .build()
                .toUri();
        log.info("uri = " + uri);

        ResponseEntity<List<StoreResponseDto>> responseEntity = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<StoreResponseDto>>() {}
        );
        List<StoreResponseDto> storeList = responseEntity.getBody();

        log.info("statusCode = " + responseEntity.getStatusCode());

        return storeList;
    }

    public List<StoreResponseDto> getAllStoresByCategory(String name) {
        URI uri = UriComponentsBuilder
                .fromUriString(serverAddress)
                .path("/stores/category")
                .encode()
                .queryParam("name", name)
                .build()
                .toUri();
        log.info("uri = " + uri);

        ResponseEntity<List<StoreResponseDto>> responseEntity = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<StoreResponseDto>>() {}
        );
        List<StoreResponseDto> storeList = responseEntity.getBody();

        log.info("statusCode = " + responseEntity.getStatusCode());

        return storeList;
    }
}
