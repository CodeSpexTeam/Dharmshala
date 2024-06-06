import { Component } from '@angular/core';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { Members } from '../../iterface/_memberInterface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.component.html',
  styleUrls: ['./memberform.component.css']
})
export class MemberformComponent {

  constructor(private memberserive:MemberserviceService,private router: Router, private toastr: ToastrService){}

  
  memberType:string[]=['Member1','Member2','Member3','Member4','Other']
   
  selectedTeam:any;

  ngOnInit(): void {
  }

  getMemberFormData(data:Members){
    // console.log(data)
    this.memberserive.saveMember(data).subscribe(
      (res) =>{
        console.log(res);
        this.router.navigate(['/member']);
        this.toastr.success('Member has been added successfuly!','Success Message');

      },
      (error) => {  
        this.toastr.error(error.error.message,'Error Message');
      }
      
    )
    
  }


  onSelected(value:any){
    this.selectedTeam = value;
    // console.log(this.selectedTeam);
  }

  
}
