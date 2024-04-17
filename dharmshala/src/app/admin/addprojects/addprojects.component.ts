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

  selectedFile: File | undefined;

  constructor(private projectService:ProjectserviceService,private toast:NgToastService, private router:Router){}

  handleFileInput(event:any){
    this.selectedFile = event.target.files[0];
  }


  OnSubmitProjects(data:any){

    if (!this.selectedFile) {
      console.error('Please select a profile image.');
      return;
    }

    const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description',data.description);
      formData.append('imageName',this.selectedFile);

    this.projectService.addProject(formData).subscribe((res:any)=>{
      this.router.navigate(['/projects']);
      this.toast.success({detail:'Success Message', summary:'Product has been added successfuly!', duration:5000});
    },
    (error)=>{
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000});
    }
    );
  }

}
