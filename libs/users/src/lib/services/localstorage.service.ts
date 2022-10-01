import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken'
@Injectable({
  providedIn: 'root'
})


export class LocalstorageService {

  constructor() { }
  setToken(data:any){
    localStorage.setItem(TOKEN,data)
  }
  getToken() : string | null {
    return localStorage.getItem(TOKEN)
  }
  removeToken()  {
    localStorage.removeItem(TOKEN)
  }
}
