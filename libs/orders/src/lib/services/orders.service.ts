import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Order } from '../models/order';
import { map, Observable } from 'rxjs';
import {environment}  from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class ordersService {
 apiURLOrders = environment.apiURL+ 'orders';
  apiURLproducts = environment.apiURL+'products';

  constructor(private http : HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiURLOrders)
  }

  getOrder(orderId : string): Observable<any>{
    return this.http.get<any>(`${this.apiURLOrders}/${orderId}`)
  }

  createOrder(order : any) : Observable<Order>{
    return this.http.post<Order>(this.apiURLOrders,order,{ withCredentials: false })
  }
  updateOrder(orderStatus: {status: Order},orderId:string) : Observable<Order>{
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`,orderStatus)
  }

  deleteOrders(orderId : string) : Observable<any>{
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`)
  }
  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }
  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }
  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLproducts}/${productId}`);
  }
}


