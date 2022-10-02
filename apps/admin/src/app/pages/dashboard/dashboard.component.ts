import { Component, OnDestroy, OnInit } from '@angular/core';
import { ordersService } from '@aphrodite/orders';
import { productsService } from '@aphrodite/products';
import { UsersService } from '@aphrodite/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics:any= [];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private userService: UsersService,
    private productService: productsService,
    private ordersService: ordersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ])
    .pipe(takeUntil(this.endsubs$)).subscribe((values) => {
      this.statistics= values;
    });
  }
  ngOnDestroy() {
    console.log("dash board distroyed");
    this.endsubs$.next('');
    this.endsubs$.complete();
  }
  }


