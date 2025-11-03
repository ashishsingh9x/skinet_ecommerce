import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSignal = signal<any | null>(null);

  setError(error: any) {
    this.errorSignal.set(error);
  }

  get error() {
    return this.errorSignal.asReadonly();
  }  
}
