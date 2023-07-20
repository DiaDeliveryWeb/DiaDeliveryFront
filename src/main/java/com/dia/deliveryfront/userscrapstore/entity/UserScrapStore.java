package com.dia.deliveryfront.userscrapstore.entity;

import com.dia.deliveryfront.store.entity.Stores;
import com.dia.deliveryfront.user.entity.Users;
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

    public UserScrapStore(Users user, Stores stores) {
        this.users = user;
        this.stores = stores;
    }
}


