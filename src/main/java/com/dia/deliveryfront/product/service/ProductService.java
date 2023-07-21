package com.dia.deliveryfront.product.service;

import com.dia.deliveryfront.product.dto.ProductResponseDto;
import com.dia.deliveryfront.store.dto.StoreOneResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j
@Service
public class ProductService {

    private final RestTemplate restTemplate;

    @Value("${server.back.address}") // 백엔드 서버 주소
    private String serverAddress;

    public ProductService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public StoreOneResponseDto getStore(String name) {
        URI uri = UriComponentsBuilder
                .fromUriString(serverAddress)
                .path("/store")
                .encode()
                .queryParam("name", name)
                .build()
                .toUri();
        log.info("uri = " + uri);

        ResponseEntity<StoreOneResponseDto> responseEntity = restTemplate.getForEntity(uri, StoreOneResponseDto.class);

        log.info("statusCode = " + responseEntity.getStatusCode());

        return responseEntity.getBody();
    }
}
