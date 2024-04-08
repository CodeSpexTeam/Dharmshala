import { Component } from '@angular/core';
import { AuthserviceService } from '../../admin service/authservice/authservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { UserStoreService } from '../../admin service/userservice/user-store.service';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  isSuperAdmin :boolean = false;

  constructor(private authService:AuthserviceService, private toast:NgToastService, private router:Router, private memberService:MemberserviceService,
    private userStore:UserStoreService
  ){}



 ngOnInit(): void {
  if(this.authService.isLoggedIn()){
    this.router.navigate(['/dashboard']);
  }

  this.IsSuperAdminExists();
 }
  
  onSignin(data:any){
    this.authService.onSubmitLoginForm(data).subscribe((res:any)=>{
      this.authService.setToken(res.token);
      const tokenPayload = this.authService.decodeToken();
      this.userStore.setFullNameFromStore(tokenPayload.unique_name);
      this.userStore.setRoleFromStore(tokenPayload.role);
      window.location.reload();
      
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



  editMemberDetails(data:any){}

  IsSuperAdminExists(){
    this.memberService.IsSuperAdminExists().subscribe((res:any)=>{
      this.isSuperAdmin = res;
    },
    (error)=>{
      debugger
      this.toast.error({detail:'Error Message', summary:error.member, duration:5000});
    }
  )
  }

}
