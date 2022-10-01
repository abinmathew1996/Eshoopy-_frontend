import { Component, OnInit } from '@angular/core';
import { ordersService } from '@aphrodite/orders';
import { productsService } from '@aphrodite/products';
import { UsersService } from '@aphrodite/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statistics:any
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
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
  }


