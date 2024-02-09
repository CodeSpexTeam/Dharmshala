import { Component } from '@angular/core';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { Members } from '../../iterface/_memberInterface';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {

  constructor (private memberserive:MemberserviceService) {}
  
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


  


  

}
