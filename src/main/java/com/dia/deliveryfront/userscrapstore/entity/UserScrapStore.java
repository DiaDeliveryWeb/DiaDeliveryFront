package com.dia.deliveryfront.userscrapstore.entity;

import com.dia.deliveryfront.user.entity.Users;
import com.dia.deliveryfront.store.entity.Stores;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class UserScrapStore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Users users;
    @ManyToOne(fetch = FetchType.LAZY)
    private Stores stores;
}
