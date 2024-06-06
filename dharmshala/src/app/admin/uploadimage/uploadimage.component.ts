import { Component } from '@angular/core';
import { GalleryserviceService } from '../admin service/galleryservice/galleryservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent {

  selectedFile: File | undefined;

  constructor(private galleryService:GalleryserviceService, private router:Router, private toastr: ToastrService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }


  handleFileInput(event:any){
    this.selectedFile = event.target.files[0];
  }

  onSubmitImage(data:any){
    if (!this.selectedFile) {
      console.error('Please select a profile image.');
      return;
    }

    const formData = new FormData();
      formData.append('title', data.title);
      formData.append('imageName',this.selectedFile);

    this.galleryService.addGallery(formData).subscribe((res:any)=>{
      this.router.navigate(['/gallery']);
      this.toastr.success('New Record has been Addded!','Success Message');
    },
    (error)=>{
      this.router.navigate(['/gallery']);
      this.toastr.error(error.message,'Error Message');
    });
  }

}
