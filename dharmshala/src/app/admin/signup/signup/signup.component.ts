import { Component } from '@angular/core';
import { admin,adminCreateAccount } from '../../iterface/_memberInterface';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthserviceService } from '../../admin service/authservice/authservice.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  
  profileForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    memberType: new FormControl(''),
    description: new FormControl(''),
    
  });

  test:adminCreateAccount = {
    password: undefined,
    token: undefined,
    members: {
      role: undefined,
      name: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      memberType: undefined,
      address: undefined,
      description: undefined
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


  AddAdmin(){
    this.test = {
      password: this.profileForm.value.password,
      token: '',
      members: {
        role: '',
        name: this.profileForm.value.name,
        lastName: this.profileForm.value.lastName,
        email: this.profileForm.value.email,
        phone: this.profileForm.value.phone,
        memberType: this.profileForm.value.memberType,
        address: this.profileForm.value.phone,
        description: this.profileForm.value.phone
      }
    }
    console.log(this.test);
    this.memberserive.createAdminMember(this.test).subscribe((res:any)=>{
      this.closeModal();
      window.location.reload();
       
        },
        (error)=>{
          this.closeModal();
          this.toast.error({detail:'Error Message', summary:error.error.message, duration:5000});
        }
      );

  }


  closeModal() {
    const cancelButton = document.querySelector('[data-bs-dismiss="modal"]')  as HTMLButtonElement;
    if (cancelButton) {
      cancelButton.click();
    }
  }
  

}