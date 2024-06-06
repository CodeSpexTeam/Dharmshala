import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';
import { ProjectserviceService } from 'src/app/admin/admin service/projectservice/projectservice.service';

@Component({
  selector: 'app-other-projects',
  templateUrl: './other-projects.component.html',
  styleUrls: ['./other-projects.component.css']
})
export class OtherProjectsComponent {

  ProjectsList:any[]=[]

  constructor(private authService:AuthserviceService, private projectService:ProjectserviceService ,private router:Router, private toastr: ToastrService){}

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toastr.warning('Please Logout First','Info Message');
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
