import { Component } from '@angular/core';
import { AuthserviceService } from '../../admin service/authservice/authservice.service';
import { UserStoreService } from '../../admin service/userservice/user-store.service';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Members } from '../../iterface/_memberInterface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  memberDetail:any={}
  public fullName : string="";
  constructor(private authService:AuthserviceService , private userStoreService:UserStoreService, private memberserive:MemberserviceService, private toast:NgToastService){}

  ngOnInit(): void {

    this.userStoreService.getFullNameFromStore().subscribe(res=>{
      const fullBNameFromToken = this.authService.getfullNameFromToken();
      this.fullName = res || fullBNameFromToken
      let adminId = this.authService.getAdminIdFromToken();
      
      this.getUser(adminId);
    });
   
  }

  getUser(adminId:number){
    this.memberserive.getMemberDetail(adminId).subscribe((res:any)=>{
      this.memberDetail =res;
    },
    (error)=>{
      this.toast.error({detail:'Error Message', summary:error.error.message,duration:5000});
    }
  );
  }


  editMemberDetails(id:number, data:any){
    Object.keys(data).forEach(key =>{
      if (data[key] === '') {
      delete data[key];
      }
    });
    data['id']=id
    console.log(data);
  
    Object.keys(data).forEach(key1 =>{
      Object.keys(this.memberDetail).forEach(key2 =>{
       if(key1==key2){
          if(data[key1]!=this.memberDetail[key2]){
            this.memberDetail[key2] = data[key1];
            // console.log("key2 " + this.memberDetail[key2]);
          }
        }
      })
    });

    console.log(this.memberDetail);

    
    this.memberserive.editMemberDetail(this.memberDetail).subscribe((res:any)=>{
    this.toast.success({detail:'Success Message', summary:res.message, duration:5000});
    },
    (error)=>{
      debugger
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000});
    }
    );
  }

  

}
