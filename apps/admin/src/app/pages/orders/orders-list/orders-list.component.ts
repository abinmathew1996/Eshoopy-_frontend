import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ordersService,ORDER_STATUS } from '@aphrodite/orders';
import { Subject, takeUntil } from 'rxjs';
import { Order } from '../../../../../../../libs/orders/src/lib/models/order';
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit,OnDestroy {
  endsubs$: Subject<any> = new Subject();

  constructor(private orderservice: ordersService, private router:Router) {}
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  ngOnInit(): void {
    this.getOrders();
  }
  ngOnDestroy() {
    console.log('category distroyed');
    this.endsubs$.next('');
    this.endsubs$.complete();
  }
  getOrders() {
    this.orderservice.getOrders().pipe(takeUntil(this.endsubs$)).subscribe((orders) => {
      this.orders = orders;
    });
  }
  deleteOrder(order: any) {}
  
  showOrder(orderId: any) {
this.router.navigateByUrl(`orders/${orderId}`)
  }
}
