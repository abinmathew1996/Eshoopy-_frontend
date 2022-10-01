import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { user } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUser = environment.apiURL + 'users';

  constructor(private http:HttpClient,private token:LocalstorageService,private router:Router  ) { }

  login(eamil:string, password:string) : Observable<user>{
  return this.http.post<user> (`${this.apiURLUser}/login`,{eamil,password})
}
logout(){
this.token.removeToken();
this.router.navigate(['/login']);
}
}
