import { Component } from '@angular/core';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { Members } from '../../iterface/_memberInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {


  memberDetail:any={}

  memberType:string[]=['Member1','Member2','Member3','Member4','Other']

  selectedTeam:any;

  constructor (private memberserive:MemberserviceService,private router:Router) {}
  
  data:Members[]=[];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.memberserive.getMemberList().subscribe((res:any)=>{
      this.data = res;
      console.log(this.data);
    }); 

  }


  deleteMemberRecord(id:number){
    this.memberserive.removeMemberFromList(id).subscribe();
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

    debugger

    Object.keys(data).forEach(key1 =>{
      Object.keys(this.memberDetail).forEach(key2 =>{
        if(data[key1]==this.memberDetail[key2]){
          console.log("key1" + data[key1]);
          
          this.memberDetail[key2] = data[key1];
        }
      })
    });

    this.memberDetail.

    this.memberserive.editMemberDetail(data).subscribe();
    
  }


  onSelected(value:any){
    this.selectedTeam = value;
  }

 

  


  

}
