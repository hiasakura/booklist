import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { FirebaseService } from '../../shared/services/firebase.service';


class ProductListElement extends Product {
  hovered: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = null;

  constructor(
    private productService: ProductService,
    private firebaseService: FirebaseService, 

    ) { }

  ngOnInit() {
    setTimeout(() => {
      this.productService.list().subscribe((products: Product[]) => {
        this.products = products.map((product: Product) => {
          return {
            ... product,
            hovered: false,
          };
        });
      });
    }, (3000));
  }

  onDetailClicked(this){
    console.log("Button Clicked : event-action-trigger");
    document.body.dispatchEvent(new CustomEvent('event-action-trigger'));
  }

  hovered(product: ProductListElement): void { product.hovered = true; }
  unhovered(product: ProductListElement): void { product.hovered = false; }
}
