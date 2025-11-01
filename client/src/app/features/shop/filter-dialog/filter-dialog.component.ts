import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatDivider } from '@angular/material/divider';
import { MatSelectionList , MatListOption} from '@angular/material/list';
import { MatAnchor } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShopComponent } from '../shop.component';



@Component({
  selector: 'app-filter-dialog',
  imports: [MatDivider, MatSelectionList, MatListOption, MatAnchor],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',
})
export class FilterDialogComponent {
  shopService = inject(ShopService);
  // we need to get access to the Mat dialog ref for our filter dialog component(1)
  private dialogRef = inject(MatDialogRef<FilterDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  selectedBrands: string[] = this.data.selectedBrands;
  selectedTypes: string[] = this.data.selectedTypes;
  
  // this will close the modal on click of close and set selected brands and types
  // when we click the button to close the dialog, rather than just clicking on the background,
  // Using this method for the dialogRef that we're injecting into this component(see(1)).
  // At that point, we set the selected brands and the selected types.
  applyFilters() {
    this.dialogRef.close({
      selectedBrands: this.selectedBrands,
      selectedTypes: this.selectedTypes
    })
  }
}
