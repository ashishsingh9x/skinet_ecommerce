import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  baseUrl: string = "https://localhost:7006/api/";
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void { 
    this.http.get(this.baseUrl + 'products').subscribe({
      next: data => console.log(data),
      error: error => console.log(error),
      complete: () => console.log('complete')
    });
  }
}
