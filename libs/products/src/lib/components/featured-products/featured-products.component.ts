import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { product } from '../../models/product';
import { productsService } from '../../services/products.service';

@Component({
  selector: 'products-product-featured',
  templateUrl: './featured-products.component.html',
  styles: [],
})
export class FeaturedProductsComponent implements OnInit,OnDestroy  {
  featuredProduct: product[] = [];
  endSubs$: Subject<any> = new Subject();
  constructor(private productService: productsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
  }
  ngOnDestroy(): void {
    this.endSubs$.next('');
    this.endSubs$.complete();
}
  private _getFeaturedProducts() {
    this.productService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => {
        this.featuredProduct = products;
      });
  }
}
