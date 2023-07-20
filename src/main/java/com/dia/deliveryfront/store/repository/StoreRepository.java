package com.dia.deliveryfront.store.repository;

import com.dia.deliveryfront.store.entity.Stores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Stores, Long> {
    List<Stores> findByCategory(String category);
    Stores findByName(String name);

}
