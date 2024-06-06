import { Component } from '@angular/core';
import { ProjectserviceService } from '../admin service/projectservice/projectservice.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addprojects',
  templateUrl: './addprojects.component.html',
  styleUrls: ['./addprojects.component.css']
})
export class AddprojectsComponent {

  projectForm: FormGroup;
  isSubmitted: boolean = false;
  selectedFile: File | undefined;
  ImageError: string= "";

  constructor(private projectService:ProjectserviceService, private router:Router, private toastr: ToastrService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  get f() {
    return this.projectForm.controls;
  }

  handleFileInput(event:any){
    this.selectedFile = event.target.files[0];
  }


  OnSubmitProjects(){

    if(this.projectForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    if (!this.selectedFile) {
      this.toastr.error('Please select a profile image.', 'Error Message');
      return;
    }

    const formData = new FormData();
      formData.append('title', this.projectForm.get('title')?.value);
      formData.append('description',this.projectForm.get('description')?.value);
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
