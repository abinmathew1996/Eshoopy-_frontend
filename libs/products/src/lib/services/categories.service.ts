import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { category } from '../models/category';
import { Observable } from 'rxjs';
import {environment}  from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 apiURLCategories = environment.apiURL+ 'categories';

  constructor(private http : HttpClient) { }

  getCategories(): Observable<category[]>{
    return this.http.get<category[]>(this.apiURLCategories)
  }

  getCategory(categoryId : string): Observable<any>{
    return this.http.get<any>(`${this.apiURLCategories}/${categoryId}`)
  }

  createCategories(category : any) : Observable<category>{
    return this.http.post<category>(this.apiURLCategories,category,{ withCredentials: false })
  }
  updateCategories(category : category) : Observable<category>{
    return this.http.put<category>(`${this.apiURLCategories}/${category.id}`,category)
  }

  deleteCategories(categoryId : string) : Observable<any>{
    return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`)
  }
}


