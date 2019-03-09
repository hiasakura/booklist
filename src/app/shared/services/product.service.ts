import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../../shared/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  int = 0;

  BASE_URL = 'https://angular-guide-firebase.firebaseio.com';
  products = [];

  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService, 
  ) { }

  list(): Observable<Product[]> {
    this.products = [];
    return this.http.get(`${this.BASE_URL}/users/${this.firebaseService.FBUUID}/products.json`, { params: { auth: this.firebaseService.FBTOKEN } }).pipe(
      map((response: any) => {
          if (response) {
            return Object.keys(response).map((key: string) => {
              const prd = response[key];
              this.products.push(new Product(prd.key, prd.name, prd.price, prd.description,null));
              return new Product(prd.key, prd.name, prd.price, prd.description,null);
            });
          } else {
            return [];
          }
        }
      )
    );
  }

  create(product: Product): Observable<void> {
    return this.http.post(`${this.BASE_URL}/users/${this.firebaseService.FBUUID}/products.json`, product, { params: { auth: this.firebaseService.FBTOKEN } }).pipe(
      map((response: any) => product.fid = response.name),
    );
  }

  get(key: number): Observable<Product> {
    return of(this.products[key-1]);
  }
  
  update(product: Product): void {
    const index = this.products.findIndex((prd: Product) => prd.key === product.key);
    this.products[index] = product;
  }
}
