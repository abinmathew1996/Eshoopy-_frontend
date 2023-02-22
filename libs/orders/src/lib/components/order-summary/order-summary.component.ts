import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ordersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice!: number;
  endSubs$: Subject<any> = new Subject();
  isCheckOut = false;
  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: ordersService
  ) {
    this.router.url.includes('checkout') ? (this.isCheckOut = true) : false;
  }

  ngOnInit(): void {
    console.log("welcome");
    
    this.getOrderSummary();
  }
  ngOnDestroy() {
    this.endSubs$.next('');
    this.endSubs$.complete();
  }

  getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.orderService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += +product.price * item.quantity;
            });
        });
      }
    });
  }
  navigateToCheckOut() {
    this.router.navigate(['/checkout']);
  }
}
