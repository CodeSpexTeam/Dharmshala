import { Component } from '@angular/core';
import { GalleryserviceService } from '../admin service/galleryservice/galleryservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent {

  constructor(private galleryService:GalleryserviceService, private toast:NgToastService, private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  onSubmitImage(data:any){
    this.galleryService.addGallery(data).subscribe((res:any)=>{
      this.router.navigate(['/gallery']);
      this.toast.success({detail:'Success Message', summary:'New Record has been Addded!', duration:5000});
    },
    (error)=>{
      this.router.navigate(['/gallery']);
      this.toast.success({detail:'Success Message', summary:error.message, duration:5000});
    });
  }

}
