import { Component } from '@angular/core';
import { FacilityserviceService } from '../../admin service/facilityservices/facilityservice.service';
import { ProjectserviceService } from '../../admin service/projectservice/projectservice.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  constructor(private projectService:ProjectserviceService){}

  ProjectsList:any[]=[]
  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProjects();
    
  }

  getAllProjects(){
    this.projectService.getProjectList().subscribe((res:any)=>{
      this.ProjectsList = res;
    })
  }

  removeProjectFromList(id:number){
    this.projectService.deleteProject(id).subscribe((res:any)=>{
      console.log(res);
    })
  }




  

}
