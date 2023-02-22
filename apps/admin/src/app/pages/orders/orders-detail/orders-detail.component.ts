import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ordersService,ORDER_STATUS } from '@aphrodite/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order: any;
  orderStatuses: any = [];
  selectedStatus: any;
  endsubs$: Subject<any> = new Subject();
  constructor(
    private messageService: MessageService,
    private orderService: ordersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOrder();
    this._mapOrderStatus();
  }
  ngOnDestroy() {
    console.log('order distroyed');
    this.endsubs$.next('');
    this.endsubs$.complete();
  }
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }
  private getOrder() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params['id']) {
        this.orderService
          .getOrder(params['id'])
          .pipe(takeUntil(this.endsubs$))
          .subscribe((order) => {
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
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated!',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated!',
          });
        },
      });
  }
}
