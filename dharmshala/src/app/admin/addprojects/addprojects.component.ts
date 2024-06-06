import { Component } from '@angular/core';
import { ProjectserviceService } from '../admin service/projectservice/projectservice.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addprojects',
  templateUrl: './addprojects.component.html',
  styleUrls: ['./addprojects.component.css']
})
export class AddprojectsComponent {

  selectedFile: File | undefined;

  constructor(private projectService:ProjectserviceService, private router:Router, private toastr: ToastrService){}

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
      this.toastr.success('Product has been added successfuly!', 'Success Message');
    },
    (error)=>{
      this.toastr.error(error.message, 'Error Message');

    }
    );
  }

}
