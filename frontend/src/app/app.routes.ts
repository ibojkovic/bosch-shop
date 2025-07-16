import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { LoginComponent } from './login/login.component';
import { registerAppScopedDispatcher } from '@angular/core/primitives/event-dispatch';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {path:'', component: ProductsComponent},
  {path:'product', component: ProductsComponent},
  {path:'product/:id', component: ProductdetailComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'logout', component: LogoutComponent},
  {path:'cart', component: CartComponent, canActivate: [authGuard]},
];
