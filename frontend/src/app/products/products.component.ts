import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { debounceTime, filter, Subject } from 'rxjs';
import { isNgContent } from '@angular/compiler';
@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  isGrid: boolean = true;
  isLoading: boolean = false;
  nologin: boolean = false;
  filteredProducts: Product[] = [];
  searchProd: string = ''
  searchSubject: Subject<string> = new Subject<string>();
  sort: string = ''

  itemsPerPage = 5
  currPage = 1
  paginationProd: Product[] = []


  constructor(private productservice: ProductService, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {

      this.isLoading = true;
      this.productservice.getAllProducts().subscribe({
          next: data=>{
            this.products = data;
            this.filteredProducts = this.products;
            this.updateDisplProd()
            this.pgn = this.paginationProd

            this.isLoading = false;
          }, error: (err) =>{
            console.error(err);
            this.isLoading = false;
          }
        });
        this.searchSubject.pipe(debounceTime(300)).subscribe((term)=>{
          this.searchChange(term)
        })
  }

  addToCart(prod: Product){
    let x = localStorage.getItem("token");
    if(!x){
      alert('You must be logged in to add items to cart.')
      this.router.navigate(['/login'])
      return
    }
    if(prod.quantity === 0 || !prod.quantity){
      alert("Enter the amount");
      return;
    }
    this.cartService.addToCart(prod.id, prod.quantity).subscribe({
        next: () => alert(`${prod.name} added to cart.`),
        error: (err: any) => console.error('Failed to add to cart:', err),
      });
  }

  info(prod: Product){
    localStorage.setItem("product", JSON.stringify(prod))
    this.router.navigate(['/product/', prod.id])
  }

  pgn:Product[] = []

  clearSearch(){
    /*this.searchProd = ''
    this.paginationProd = this.pgn*/
        this.searchProd = '';
    this.filteredProducts = [...this.products];
    this.updateDisplProd();
  }

  searchChange(str: string){
            /*console.log(this.pgn)
                    console.log(this.paginationProd)


    this.paginationProd = this.pgn.filter((p) => p.name.toLowerCase().includes(str.toLowerCase()))*/
        this.currPage = 1;
    this.filteredProducts = this.products.filter((p) =>
      p.name.toLowerCase().includes(str.toLowerCase())
    );
        this.updateDisplProd();

  }

  changeSort(){
    if(this.sort === "lowprice"){
      this.filteredProducts.sort((a,b) => a.price - b.price)
    }else if(this.sort === "highprice"){
      this.filteredProducts.sort((a,b) => b.price - a.price)
    }else if(this.sort === "nameAZ"){
      this.filteredProducts.sort((a,b) => a.name.localeCompare(b.name))
    }else if(this.sort === "nameZA"){
      this.filteredProducts.sort((a,b) => b.name.localeCompare(a.name))
    }else if(this.sort === "none"){
      this.ngOnInit()
    }
        this.currPage = 1;
    this.updateDisplProd();
  }

  totalPage():number{
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
  }

  updateDisplProd(){
    const start = (this.currPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    this.paginationProd = this.filteredProducts.slice(start,end)

  }

  goToPage(page: number){
    if (page < 1 || page > this.totalPage()) return;
    this.currPage = page
    this.updateDisplProd()
  }


onItemsPerPageChange() {
  this.currPage = 1;
  this.updateDisplProd();
}


}
