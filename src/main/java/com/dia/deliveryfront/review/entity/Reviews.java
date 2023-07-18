package com.dia.deliveryfront.review.entity;

import com.dia.deliveryfront.user.entity.Users;
import com.dia.deliveryfront.store.entity.Stores;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;
    @Column
    private String imageUrl;
    @Column
    private double rate;

    @ManyToOne(fetch = FetchType.LAZY)
    private Users users;
    @ManyToOne(fetch = FetchType.LAZY)
    private Stores stores;
}
