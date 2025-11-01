import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatDivider } from '@angular/material/divider';
import { MatSelectionList , MatListOption} from '@angular/material/list';
import { MatAnchor } from "@angular/material/button";



@Component({
  selector: 'app-filter-dialog',
  imports: [MatDivider, MatSelectionList, MatListOption, MatAnchor],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',
})
export class FilterDialogComponent {
  shopService = inject(ShopService);

}
