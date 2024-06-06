import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';
import { GalleryserviceService } from 'src/app/admin/admin service/galleryservice/galleryservice.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent {
  galleryList:any[]=[];
  constructor(private authService:AuthserviceService, private galleyService:GalleryserviceService, private router:Router, private toastr: ToastrService){}

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toastr.warning('Please Logout First','Info Message');
    }

    this.getAllImageList();

  }

  getAllImageList(){
    this.galleyService.getGalleryList().subscribe((res:any)=>{
      this.galleryList = res;
      console.log(this.galleryList);
    })

  }


}
