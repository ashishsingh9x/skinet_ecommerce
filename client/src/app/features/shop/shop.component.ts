import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ProductItemComponent, MatButton, MatIcon, MatMenu, MatSelectionList, MatListOption,
    MatMenuTrigger
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  //inject dialogService so we can open up modal
  private dialogService = inject(MatDialog);

  products: Product[] = [];
  shopParams = new ShopParams;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value:'priceDesc' }
  ]
  
  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void { 
    this.InitializeShop();
  }

  InitializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProduct();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOptions = event.options[0];
    if (selectedOptions) {
      this.shopParams.sort = selectedOptions.value;
      this.getProduct();
    }
  }

  getProduct() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
      },
      error: error => console.log(error)
    });
  }

  openFilterDialog() {
    // dialog service is service from angular material, some component in angular material 
    // comes with service like the below one.
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      minWidth: '500px',
      data: { //pass these 2 to our filter dialog component
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types
      }
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          console.log(result);
          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.getProduct();
        }
      }
    })
  }
}
