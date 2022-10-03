import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { OrdersModule } from '@aphrodite/orders';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CheckboxModule } from 'primeng/checkbox';
const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    OrdersModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductListComponent,
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductListComponent,
  ],
})
export class ProductsModule {}
