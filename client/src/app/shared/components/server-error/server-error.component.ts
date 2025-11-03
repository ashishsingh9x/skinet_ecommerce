import { Component, computed, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-server-error',
  imports: [ MatCard ],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss',
})
export class ServerErrorComponent {
  private errorService = inject(ErrorService);
  constructor() {
  }

  error = this.errorService.error;
}
