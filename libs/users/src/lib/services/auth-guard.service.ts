import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate,Router,RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private  router:Router,private localStorage:LocalstorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token =this.localStorage.getToken();

    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode.isAdmin && !this.tokenenExpired(tokenDecode.exp)) return true;
      
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
  private tokenenExpired(expiration :any):boolean{
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
