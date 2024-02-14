import { Component } from '@angular/core';
import { ProjectserviceService } from '../admin service/projectservice/projectservice.service';

@Component({
  selector: 'app-addprojects',
  templateUrl: './addprojects.component.html',
  styleUrls: ['./addprojects.component.css']
})
export class AddprojectsComponent {

  constructor(private projectService:ProjectserviceService){}

  OnSubmitProjects(data:any){
    this.projectService.addProject(data).subscribe((res:any)=>{
      console.log(res);
    });
  }

}
