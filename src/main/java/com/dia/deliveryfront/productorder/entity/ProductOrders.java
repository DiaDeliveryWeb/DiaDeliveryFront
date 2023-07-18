package com.dia.deliveryfront.productorder.entity;

import com.dia.deliveryfront.product.entity.Products;
import com.dia.deliveryfront.order.entity.Orders;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class ProductOrders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Products products;

    @ManyToOne(fetch = FetchType.LAZY)
    private Orders orders;
}
