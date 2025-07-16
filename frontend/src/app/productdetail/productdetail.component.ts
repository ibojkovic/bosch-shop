import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ProductdetailComponent implements OnInit {
  product: Product = new Product();
  productId!: string;
  error: boolean = false;
  keys: string[] = [];



  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProdById(this.productId).subscribe({
      next: (p) => {this.product = p, this.keys = Object.keys(p.technicalSpecifications)},
      error: () => this.error = true
    });
  }

  addToCart(prod: Product){
    let x = localStorage.getItem("token");
    if(!x){
      alert('You must be logged in to add items to cart.')
      this.router.navigate(['/login'])
      return
    }
    this.cartService.addToCart(prod.id, prod.quantity).subscribe({
        next: () => alert(`${prod.name} added to cart.`),
        error: (err: any) => console.error('Failed to add to cart:', err),
      });
  }


  getSpecValue(key: string): string {
    return this.product.technicalSpecifications[key];
  }



}
