import { HttpClient } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = 'http://localhost:8080/api/cart';

  private cartChanged = new BehaviorSubject<void>(undefined)
  cartChanged$ = this.cartChanged.asObservable();

  constructor(private http: HttpClient) { }

  addToCart(productId: string, quantity: number): Observable<any>{
    return this.http.post(`${this.url}/add`, {productId, quantity}).pipe(
      tap(() => this.cartChanged.next())
    );
  }

  getCart(){
  const token = localStorage.getItem("token");
  if (!token) {
    return of([]);
  }
    return this.http.get<Cart[]>(`${this.url}`).pipe(
      tap(() => this.cartChanged.next())
    );
  }

  updateQuantity(id: String, quantity: number ){
    return this.http.put(`${this.url}/item/${id}`, {quantity}).pipe(
      tap(() => this.cartChanged.next())
    );
  }

  removeItem(id:string){
    return this.http.delete(`${this.url}/item/${id}`).pipe(
      tap(() => this.cartChanged.next())
    );
  }

}
