package com.example.backend.repository;

import com.example.backend.models.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepo extends MongoRepository<CartItem, String> {
    Optional<CartItem> findByUserIdAndProductId(String userId, String productId);
    List<CartItem> findByUserId(String userId);
    Optional<CartItem> findById(String id);
}
