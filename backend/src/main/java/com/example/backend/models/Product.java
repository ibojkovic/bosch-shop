package com.example.backend.models;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "product")
public class Product {

    @Field("id")
    private String id;

    private String name;
    private double price;

    @Field("shortDescription")
    private String shortDescription;

    @Field("fullDescription")
    private String fullDescription;

    private String[] images;

    @Field("technicalSpecifications")
    private java.util.Map<String, String> technicalSpecifications;

    // Getteri i setteri
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public String[] getImages() {
        return images;
    }

    public void setImages(String[] images) {
        this.images = images;
    }

    public java.util.Map<String, String> getTechnicalSpecifications() {
        return technicalSpecifications;
    }

    public void setTechnicalSpecifications(java.util.Map<String, String> technicalSpecifications) {
        this.technicalSpecifications = technicalSpecifications;
    }
}
