import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';



  cartService = inject(CartService);
  cartItemCount = signal(0);

constructor(private router: Router) {

  this.loadCartCount();

    this.cartService.cartChanged$.subscribe(() => {
      this.loadCartCount();
    });
  }

  loadCartCount() {
    this.cartService.getCart().subscribe({
      next: (items: Cart[]) => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartItemCount.set(total);
      },
      error: () => this.cartItemCount.set(0)
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }


}
