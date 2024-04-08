import { Component } from '@angular/core';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { Members } from '../../iterface/_memberInterface';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  memberDetail:any={}

  memberType:string[]=['Member1','Member2','Member3','Member4','Other']

  selectedTeam:any;

  constructor (private memberserive:MemberserviceService,private router:Router, private toast:NgToastService) {}
  
  data:Members[]=[];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.displayMemberList();
    
  }

  displayMemberList(){
    this.memberserive.getMemberList().subscribe((res:any)=>{
      this.data = res;
      this.data= this.data.filter(m=>m.role != "Admin");
      console.log(this.data);
    }); 
  }


  deleteMemberRecord(id:number){
    this.memberserive.removeMemberFromList(id).subscribe((res)=>{
      window.location.reload();
    },
    (error)=>{
      this.toast.success({detail:'Success Message',summary:error.error.message, duration:5000})
    }
    );

  }

  getMemberRecord(id:number){
    this.memberserive.getMemberDetail(id).subscribe((res)=>{
      this.memberDetail=res;
      console.log(this.memberDetail);
    });
   
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
      this.closeModal();
      this.displayMemberList();
      this.toast.success({detail:'Success Message', summary:res.message, duration:5000});
    },
    (error)=>{
      this.closeModal();
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000});
    }
    );
  }

  closeModal() {
    const cancelButton = document.querySelector('[data-bs-dismiss="modal"]')  as HTMLButtonElement;
    if (cancelButton) {
      cancelButton.click();
    }
  }

  onSelected(value:any){
    this.selectedTeam = value;
  }



}
