import { Component } from '@angular/core';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { Members } from '../../iterface/_memberInterface';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.component.html',
  styleUrls: ['./memberform.component.css']
})
export class MemberformComponent {

  constructor(private memberserive:MemberserviceService,private router: Router, private toast:NgToastService){}

  
  memberType:string[]=['Member1','Member2','Member3','Member4','Other']
   
  selectedTeam:any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
   
  }

  getMemberFormData(data:Members){
    // console.log(data)
    this.memberserive.saveMember(data).subscribe(
      (res) =>{
        console.log(res);
        this.router.navigate(['/member']);
        this.toast.success({detail:'Success Message', summary:'Member has been added successfuly!', duration:5000});
      },
      (error) => {  
        this.toast.error({detail:'Error Message', summary:error.error.message, duration:5000});
      }
      
    )
    
  }


  onSelected(value:any){
    this.selectedTeam = value;
    // console.log(this.selectedTeam);
  }

  
}
