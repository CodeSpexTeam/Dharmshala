import { Component } from '@angular/core';
import { admin,adminCreateAccount } from '../../iterface/_memberInterface';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthserviceService } from '../../admin service/authservice/authservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  data:admin[]=[];
  memberDetail:any={}
  memberType:string[]=['Member1','Member2','Member3','Member4','Other']
  selectedTeam:any;

  testdsa:adminCreateAccount={
    password: '',
    token: '',
    members: {
      role: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      memberType: '',
      address: '',
      description: ''
    }
  }

  constructor(private memberserive:MemberserviceService, private toast:NgToastService, private authService:AuthserviceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.displayAdminList();
    
  }

  displayAdminList(){
   this.memberserive.getAdminMemberList().subscribe((res:any)=>{
    let adminId = this.authService.getAdminIdFromToken();
    this.data = res
    this.data = this.data.filter(m=>m.membersId!=adminId);
      console.log(this.data);
    }); 

  }

  deleteAdminRecord(id:number){
    this.memberserive.removeAdminFromList(id).subscribe((res)=>{
      window.location.reload();
    },
    (error)=>{
      debugger
      this.toast.success({detail:'Success Message',summary:error.error.message, duration:5000})
    }
    );

  }


  AddAdmin(data:any){
    data.token = "";
    data.role = "Admin";
    this.testdsa = data;
  debugger
    this.memberserive.createAdminMember(this.testdsa).subscribe((res:any)=>{

        },
        (error)=>{
          this.toast.error({detail:'Error Message', summary:error.message, duration:5000});
        }
      );


  }

  onSelected(data:any){}
  

}