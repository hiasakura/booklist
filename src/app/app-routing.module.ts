import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductNewComponent },
  { path: 'products/:key', component: ProductDetailComponent },
  { path: 'products/:key/edit', component: ProductEditComponent },
  { path: '', redirectTo: '/products', pathMatch: 'prefix' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}