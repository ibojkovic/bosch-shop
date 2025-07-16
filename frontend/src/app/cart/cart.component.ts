import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class CartComponent  implements OnInit{

  itemList: Cart[] = []
  isLoading: boolean = false;
  error: boolean = false;

  totalPriceAllItem: number = 0;

  prodList: Product[] = []

  constructor(private cartService: CartService, private productService: ProductService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: (data: Cart[]) => {
        this.itemList = data;

          if (this.itemList.length === 0) {
            this.isLoading = false;
            return;
          }

        const productCalls = this.itemList.map(item =>
          this.productService.getProdById(item.productId)
        );

        forkJoin(productCalls).subscribe({
          next: (products: Product[]) => {
            this.prodList = products;

            this.totalPriceAllItem = 0;
            this.itemList.forEach((item, index) => {
              item.totalPrice = products[index].price * item.quantity;
              this.totalPriceAllItem += item.totalPrice;
            });

            this.isLoading = false;
          },
          error: () => {
            console.log("Failed to load product details.");
            this.isLoading = false;
            this.error = true;
          }
        });
      },
      error: () => {
        console.log("Failed to load cart.");
        this.isLoading = false;
        this.error = true;
      }
    });
  }

  updateQuantity(cart: Cart){
    if(!cart.updQuantity){
      alert("Enter the amount.");
      return
    }


    this.cartService.updateQuantity(cart.id,cart.updQuantity).subscribe({
      next: () => {
      this.ngOnInit();
      },
      error: () => {
        alert("Failed to update quantity.");
      }
    })
  }
  removeFromCart(cart:Cart){
    this.cartService.removeItem(cart.id).subscribe({
      next: () => {
      this.ngOnInit();
      },
      error: () => {
        alert("Failed to update quantity.");
      }
    })
  }

}
