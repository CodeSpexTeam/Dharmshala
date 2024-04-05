import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../admin/admin service/authservice/authservice.service';
import { NgToastService } from 'ng-angular-popup';




@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthserviceService, private router: Router, private toast:NgToastService) {}

  canActivate():boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.toast.error({detail:"ERROR",summary:"Please LoginFirst",duration:5000});
      this.router.navigate(['/admin'])
      return true;
    }
  }
   
  
}
