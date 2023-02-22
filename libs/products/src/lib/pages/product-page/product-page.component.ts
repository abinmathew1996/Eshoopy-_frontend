import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@aphrodite/orders';
import { Subject, takeUntil } from 'rxjs';
import { product } from '../../models/product';
import { productsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit,OnDestroy {
  product!: product;
  endSubs$: Subject<any> = new Subject();
  quantity: number = 1;
  constructor(
    private productService: productsService,
    private route: ActivatedRoute,
    private cartService : CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this._getproduct(params['productid']);
      }
    });
  }
  ngOnDestroy(): void {
    this.endSubs$.next('');
    this.endSubs$.complete();
}

  private _getproduct(id: string) {
    this.productService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }
  addProductToCart(){
    const cartItem :CartItem= {
      productId :this.product.id,
      quantity : this.quantity
    } 
    this.cartService.setCartItem(cartItem)
}

}
