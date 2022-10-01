import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ordersService } from '@aphrodite/orders';
import { Order } from '../../../../../../../libs/orders/src/lib/models/order';
import {ORDER_STATUS} from '../order.constants'
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  constructor(private orderservice: ordersService, private router:Router) {}
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.orderservice.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
  deleteOrder(order: any) {}
  
  showOrder(orderId: any) {
this.router.navigateByUrl(`orders/${orderId}`)
  }
}
