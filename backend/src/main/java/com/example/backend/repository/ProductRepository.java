package com.example.backend.repository;

import com.example.backend.models.Product;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
    Optional<Product> findById(String id); 

}
