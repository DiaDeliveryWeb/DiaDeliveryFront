package com.dia.deliveryfront.store.entity;

import com.dia.deliveryfront.user.entity.Users;
import com.dia.deliveryfront.userscrapstore.entity.UserScrapStore;
import com.dia.deliveryfront.product.entity.Products;
import com.dia.deliveryfront.review.entity.Reviews;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Stores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
    @Column
    private String introduction;
    @Column
    private String imageUrl;
    @Column
    private String Category;

    @OneToMany(mappedBy = "stores")
    private List<Products> productsList = new ArrayList<>();
    @OneToMany(mappedBy = "stores")
    private List<Reviews> reviewsList = new ArrayList<>();
    @OneToMany(mappedBy = "stores")
    private List<UserScrapStore> userScrapStoreList = new ArrayList<>();
    @ManyToOne(fetch = FetchType.LAZY)
    private Users users;
//    aa
}
