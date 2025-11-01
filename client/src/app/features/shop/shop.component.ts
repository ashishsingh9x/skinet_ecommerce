import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ProductItemComponent, MatButton, MatIcon
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  //inject dialogService so we can open up modal
  private dialogService = inject(MatDialog);

  products: Product[] = [];
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];
  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void { 
    this.InitializeShop();
  }

  InitializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.shopService.getProducts().subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error),
      complete: () => console.log('complete')
    });
  }

  openFilterDialog() {
    // dialog service is service from angular material, some component in angular material 
    // comes with service like the below one.
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      minWidth: '500px',
      data: { //pass these 2 to our filter dialog component
        selectedBrands: this.selectedBrands,
        selectedTypes: this.selectedTypes
      }
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          console.log(result);
          this.selectedBrands = result.selectedBrands;
          this.selectedTypes = result.selectedTypes
        }
      }
    })
  }
}
