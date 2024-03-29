import { Component } from '@angular/core';
import { AuthserviceService } from '../../admin service/authservice/authservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private authService:AuthserviceService, private toast:NgToastService, private router:Router){}

  onSignin(data:any){
    this.authService.onSubmitLoginForm(data.email, data.password).subscribe((res:any)=>{
      this.router.navigate(['/dashboard']);
      this.toast.success({detail:'Success Message', summary:'Login Success!',duration:5000});
    },
    (error)=>{
      this.toast.success({detail:'Error Message', summary:error.message,duration:5000});
    });
   
  }

}
