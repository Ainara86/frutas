import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../providers/login.service';

@Injectable({
  providedIn: 'root'
})
export class BackofficeGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { 
    console.trace('Constructor BackofficeGuard');
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      console.trace('canActivate BackofficeGuard');
      if(! this.loginService.isLogged()){
        this.router.navigate(['login']);
        return false;
      }
      return true;
      this.router.navigate(['login']);
    return true;
  }
}