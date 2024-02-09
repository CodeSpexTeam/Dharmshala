import { Component } from '@angular/core';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { Members } from '../../iterface/_memberInterface';

@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.component.html',
  styleUrls: ['./memberform.component.css']
})
export class MemberformComponent {

  constructor(private memberserive:MemberserviceService){}

  
  memberType:string[]=['Member1','Member2','Member3','Member4','Other']
   
  selectedTeam:any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
   
  }

  getMemberFormData(data:Members){
    // console.log(data)
    this.memberserive.saveMember(data).subscribe();
    
  }


  onSelected(value:any){
    this.selectedTeam = value;
    // console.log(this.selectedTeam);
  }

  
}
