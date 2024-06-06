import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../admin/admin service/authservice/authservice.service';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthserviceService, private router: Router, private toastr: ToastrService) {}

  canActivate():boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.toastr.error("Please LoginFirst",'Error Message');
      this.router.navigate(['/admin'])
      return true;
    }
  }
   
  
}
