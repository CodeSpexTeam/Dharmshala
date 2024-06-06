import { Component } from '@angular/core';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { Members } from '../../iterface/_memberInterface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  memberDetail:any={}

  memberType:string[]=['Member1','Member2','Member3','Member4','Other']

  selectedTeam:any;

  constructor (private memberserive:MemberserviceService,private router:Router, private toastr: ToastrService) {}
  
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
      this.toastr.error(error.error.message,'Error Message');


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
      this.toastr.success(res.message,'Success Message');

    },
    (error)=>{
      this.closeModal();
      this.toastr.error(error.message,'Error Message');

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
