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
 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

 }
  
  onSignin(data:any){
    this.authService.onSubmitLoginForm(data).subscribe((res:any)=>{
      this.authService.setToken(res.token);
      window.location.reload();
      this.router.navigate(['/dashboard']);
      this.toast.success({detail:'success Message', summary:"Login Success!",duration:5000});
    }
    ,
    (error)=>{
      if(error.error.message!=null){
        this.toast.error({detail:'Error Message', summary:error.error.message,duration:5000});
      }else{
        this.toast.error({detail:'Error Message', summary:error.message,duration:5000});
      }
      
    }
    
    
    );

   
   
  }

}
