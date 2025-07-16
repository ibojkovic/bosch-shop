package com.example.backend.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.CartItem;
import com.example.backend.repository.CartRepo;
import com.example.backend.utils.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

   @Autowired
private CartRepo cartRepository;

    private final JwtUtil jwtUtil;

    public CartController(CartRepo cartRepository, JwtUtil jwtUtil) {
        this.cartRepository = cartRepository;
        this.jwtUtil = jwtUtil;
    }

    private String extractUserId(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader != null && authHeader.startsWith("Bearer ")
                ? authHeader.substring(7) : null;

        if (token == null || !jwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid or missing token");
        }

        return jwtUtil.getUserIdFromToken(token);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartItem items,HttpServletRequest request) {
        String userId = extractUserId(request);
        items.setUserId(userId);

        Optional<CartItem> exist = cartRepository.findByUserIdAndProductId(userId, items.getProductId());
        if(exist.isPresent()){
            CartItem existedItem = exist.get();
            existedItem.setQuantity(existedItem.getQuantity() + items.getQuantity());
            cartRepository.save(existedItem);
        }else{
            cartRepository.save(items);
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @GetMapping("")
    public ResponseEntity<List<CartItem>> getCart(HttpServletRequest request) {
        String userId = extractUserId(request);
        List<CartItem> cartItemsUser = cartRepository.findByUserId(userId);
        return ResponseEntity.ok(cartItemsUser);
    }

    @PutMapping("/item/{id}")
    public ResponseEntity<?> updateQuantity(@PathVariable String id,@RequestBody Map<String, Integer> body, HttpServletRequest request) {
        String userId = extractUserId(request);
        Optional<CartItem> existItem = cartRepository.findById(id);

        if(existItem.isPresent() && existItem.get().getUserId().equals(userId)){
            CartItem updItem = existItem.get();

            updItem.setQuantity(body.get("quantity"));
            cartRepository.save(updItem);
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<?> removeItem(@PathVariable String id, HttpServletRequest request){
        String userId = extractUserId(request);
        Optional<CartItem> existItem = cartRepository.findById(id);

        if(existItem.isPresent() && existItem.get().getUserId().equals(userId)){
            CartItem updItem = existItem.get();
            cartRepository.delete(updItem);
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    
    

    
}
