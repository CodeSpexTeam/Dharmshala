import { Component } from '@angular/core';
import { GalleryserviceService } from '../../admin service/galleryservice/galleryservice.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  constructor(private galleryService:GalleryserviceService){}
  
  galleryList:any[]=[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getAllGalleryList();
    
  }


  getAllGalleryList(){
    this.galleryService.getGalleryList().subscribe((res:any)=>{
     this.galleryList = res;
    });
  }


  removeImageFromList(id:number){
    this.galleryService.deleteGallery(id).subscribe((res:any)=>{
      this.galleryList = res;
     });
  }



}
