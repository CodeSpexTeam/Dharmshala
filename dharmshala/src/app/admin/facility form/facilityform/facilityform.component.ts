import { Component } from '@angular/core';
import { FacilityserviceService } from '../../admin service/facilityservices/facilityservice.service';

import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-facilityform',
  templateUrl: './facilityform.component.html',
  styleUrls: ['./facilityform.component.css'],
})
export class FacilityformComponent {
  selectedFile: File | undefined;
  FacilityForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private facilityService: FacilityserviceService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.FacilityForm = this.fb.group({
      facility: ['', [Validators.required]],
      fees: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get f() {
    return this.FacilityForm.controls;
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
  }

  OnSubmitFacility() {
    if (this.FacilityForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    if (!this.selectedFile) {
      // console.error('Please select a profile image.');
      this.toastr.error('Please select a profile image.', 'Error Message');
      return;
    }

    // console.log(this.FacilityForm.value);
    // console.log(this.selectedFile);

    const formData = new FormData();
    formData.append('facilityName', this.FacilityForm.get('facility')?.value);
    formData.append('fees', this.FacilityForm.get('fees')?.value);
    formData.append('description', this.FacilityForm.get('description')?.value);
    formData.append('imageName', this.selectedFile);

    debugger;
    this.facilityService.addFacility(formData).subscribe((res:any)=>{
      // console.log(res);
      this.router.navigate(['/facility']);
      this.toastr.success("New facility has been added!", 'Success Message');
    },
    (error)=>{
      // this.router.navigate(['/facility']);
      // console.log(error)
      this.toastr.error(error.error.message, 'Error Message');
    }
    );
  }
}
