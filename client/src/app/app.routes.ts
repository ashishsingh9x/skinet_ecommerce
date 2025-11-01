import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ShopComponent } from './features/shop/shop.component';
import { ProductDetailsComponent } from './features/shop/product-details/product-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'productdetail/:id', component: ProductDetailsComponent},
    {path: 'shop', component: ShopComponent},
    {path: '**', redirectTo: '', pathMatch: 'full' }
];
