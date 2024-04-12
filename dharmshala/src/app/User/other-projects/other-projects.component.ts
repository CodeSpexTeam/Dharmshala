import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';
import { ProjectserviceService } from 'src/app/admin/admin service/projectservice/projectservice.service';

@Component({
  selector: 'app-other-projects',
  templateUrl: './other-projects.component.html',
  styleUrls: ['./other-projects.component.css']
})
export class OtherProjectsComponent {

  ProjectsList:any[]=[]

  constructor(private authService:AuthserviceService, private projectService:ProjectserviceService ,private router:Router, private toast:NgToastService){}

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toast.warning({detail:'Info Message', summary:'Please Logout First', duration:5000});
    }

    this.getAllProjectList();
  }


  getAllProjectList(){
      this.projectService.getProjectList().subscribe((res:any)=>{
        this.ProjectsList = res;
        console.log(this.ProjectsList);
      })
  }

}
