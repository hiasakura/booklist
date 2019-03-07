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
  UID = 'NADje3xhZ1V8P3cwVZckZ6b9bbF3';
  TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwYmVmMzI2MmVkMzI0MzZkNzhlMjdjYWJhYzg3YmIwZWUxZGYwYzIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYW5ndWxhci1ndWlkZS1maXJlYmFzZSIsImF1ZCI6ImFuZ3VsYXItZ3VpZGUtZmlyZWJhc2UiLCJhdXRoX3RpbWUiOjE1NTE5NTM5MDIsInVzZXJfaWQiOiJOQURqZTN4aFoxVjhQM2N3Vlpja1o2YjliYkYzIiwic3ViIjoiTkFEamUzeGhaMVY4UDNjd1ZaY2taNmI5YmJGMyIsImlhdCI6MTU1MTk1MzkwMiwiZXhwIjoxNTUxOTU3NTAyLCJlbWFpbCI6Imhpcm9hc3RiZWFmQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJoaXJvYXN0YmVhZkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.htJ_gBPAB7onEgyGdJWtuYSWYaN4B7Mmq_khxFN7aVh8odsuLYCYXS_jdoaC_W9wxbxlylemgyV8D8izl4wv-sXt3d8KMgHZXFF-4l4bUTtjaU0-IuXNd7g04RaX6Pg0lJMberJfowZO-IAM0SEgJIfZ3aSAR4TLh10odM0EXAS1RJKTUG9qAzTwfdeaqnmi-xYrCLBqLSllj9jUV431WM5HbCH3HhtvFd47itRm_cA4BlAJ7dTXGyf8bRec9VTD6NQmvEoFkoctcA3mc16YCofIQKUGkO5g1KVudu5_Gd0SxtsF9XqQJJBckYZmob9LFh--4QNEgad9karDYxzQ9g';

  products = [
    new Product(1, 'Angular入門書「天地創造の章」', 3800, '神は云った。「Angularあれ」。するとAngularが出来た。',1),
    new Product(2, 'WiAngularを覚えたら、年収も上がって、女の子にももてて、人生が変わりました！', 410, '年収300万のSEが、Angularと出会う。それは、小さな会社の社畜が始めた、最初の抵抗だった。',2),
    new Product(3, '異世界転生から始めるAngular生活(1)', 680,
      'スパゲッティの沼でデスマーチ真っ最中の田中。過酷な日々からの現実逃避か彼は、異世界に放り出され、そこでAngularの入門書を拾う。現実逃避でさえ、プログラミングをするしかない彼に待ち受けるのは！？',3),
  ];

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<Product[]> {
    this.products = [];
    return this.http.get(`${this.BASE_URL}/users/${this.UID}/products.json`, { params: { auth: this.TOKEN } }).pipe(
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
    return this.http.post(`${this.BASE_URL}/users/${this.UID}/products.json`, product, { params: { auth: this.TOKEN } }).pipe(
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
