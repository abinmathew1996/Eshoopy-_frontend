import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/user';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {
  apiURLUser = environment.apiURL+ 'users';

    constructor(private http : HttpClient) { }
  
    getUSers(): Observable<user[]>{
      return this.http.get<user[]>(this.apiURLUser)
    }
    getUser(userId: string): Observable<user> {
      return this.http.get<user>(`${this.apiURLUser}/${userId}`);
    }
  
   
  
    createUser(user: FormData): Observable<user> {
      return this.http.post<user>(this.apiURLUser, user);
    }
  
  
  
    updateUser(user: user): Observable<user> {
      return this.http.put<user>(`${this.apiURLUser}/${user.id}`, user);
    }
  
    deleteUser(userId: string): Observable<any> {
      return this.http.delete<any>(`${this.apiURLUser}/${userId}`);
    }
}
