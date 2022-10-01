import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ordersService } from '@aphrodite/orders';
import { MessageService } from 'primeng/api';
import {ORDER_STATUS} from '../order.constants'
@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit {
  order: any;
  orderStatuses:any = [];
  selectedStatus: any;
  constructor(
    private messageService: MessageService,
    private orderService: ordersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOrder();
    this._mapOrderStatus();
  }
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }
  private getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.orderService.getOrder(params['id']).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
          // console.log(order.status);
        });
      }
    });
  }
  onStatusChange(event: any) {
    this.orderService
      .updateOrder({ status: event.value }, this.order.id)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated!',
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated!',
          });
        }
      );
  }
}
