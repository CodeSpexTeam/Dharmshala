import { Component } from '@angular/core';
import { AuthserviceService } from '../../admin service/authservice/authservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  
  constructor(private authService:AuthserviceService, private toast:NgToastService, private router: Router){}

  ngOnInit(): void {
   

    
  }

  onLogOut(){
   let status = this.authService.isLogOut();

   if(status==true){
   this.router.navigate(['/']);
   window.location.reload();
    this.toast.success({detail:'Success Message',summary:'Logout Success!'});
   }
    
  };

  
  
  



}
