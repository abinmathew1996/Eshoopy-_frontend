import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {environment}  from '@env/environment'
import { product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class productsService {
 apiURLproducts = environment.apiURL+ 'products';

  constructor(private http : HttpClient) { }

  getProducts(): Observable<product[]>{
    return this.http.get<product[]>(this.apiURLproducts)
  }

 

  createProduct(productData: FormData): Observable<product> {
    return this.http.post<product>(this.apiURLproducts, productData);
  }

  getProduct(productId: string): Observable<product> {
    return this.http.get<product>(`${this.apiURLproducts}/${productId}`);
  }

  updateProduct(productData: FormData, productid: string): Observable<product> {
    return this.http.put<product>(`${this.apiURLproducts}/${productid}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLproducts}/${productId}`);
  }
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLproducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count:number): Observable  <product[]> {
return this.http.get<product[]>(`${this.apiURLproducts}/get/featured/${count}`)
  }
}




