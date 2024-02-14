import { Component } from '@angular/core';
import { Members } from '../../iterface/_memberInterface';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';

@Component({
  selector: 'app-membereditform',
  templateUrl: './membereditform.component.html',
  styleUrls: ['./membereditform.component.css']
})
export class MembereditformComponent {

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
