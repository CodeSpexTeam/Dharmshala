import { Component } from '@angular/core';
import { GalleryserviceService } from '../admin service/galleryservice/galleryservice.service';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent {

  constructor(private galleryService:GalleryserviceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  onSubmitImage(data:any){
    this.galleryService.addGallery(data).subscribe((res:any)=>{
        console.log(res);
    });
  }

}
