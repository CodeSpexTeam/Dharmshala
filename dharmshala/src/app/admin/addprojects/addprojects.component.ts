import { Component } from '@angular/core';
import { ProjectserviceService } from '../admin service/projectservice/projectservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addprojects',
  templateUrl: './addprojects.component.html',
  styleUrls: ['./addprojects.component.css']
})
export class AddprojectsComponent {

  constructor(private projectService:ProjectserviceService,private toast:NgToastService, private router:Router){}

  OnSubmitProjects(data:any){
    this.projectService.addProject(data).subscribe((res:any)=>{
      this.router.navigate(['/projects']);
      this.toast.success({detail:'Success Message', summary:'Product has been added successfuly!', duration:5000});
    },
    (error)=>{
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000});
    }
    );
  }

}
