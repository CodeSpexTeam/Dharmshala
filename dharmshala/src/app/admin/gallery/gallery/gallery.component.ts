import { Component } from '@angular/core';
import { GalleryserviceService } from '../../admin service/galleryservice/galleryservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  constructor(private galleryService:GalleryserviceService, private toastr: ToastrService){}
  
  galleryList:any[]=[];
  galleryDetails:any={};
  isClicked:boolean = false;
  clickedImageSrc:string|undefined;
  // selectedFile: File | undefined;

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
      window.location.reload();
      },
      (error)=>{
        this.toastr.error(error.message,'Error Message');
      }
    )
  }

  getGalleryRecord(id:number){
    this.galleryService.getGallery(id).subscribe((res:any)=>{
      this.galleryDetails = res;
    })
  }

  editGalleryDetails(id:number, data:any){
    
    Object.keys(data).forEach(key =>{
      if (data[key] === '') {
      delete data[key];
      }
    });
    data['id']=id
    console.log(data);
  
    Object.keys(data).forEach(key1 =>{
      Object.keys(this.galleryDetails).forEach(key2 =>{
       if(key1==key2){
          if(data[key1]!=this.galleryDetails[key2]){
            this.galleryDetails[key2] = data[key1];
            // console.log("key2 " + this.memberDetail[key2]);
          }
        }
      })
    });
  
      this.galleryService.updateGallery(this.galleryDetails).subscribe((res:any)=>{
        this.closeModal();
        this.getAllGalleryList();
        this.toastr.success(res.message,'Success Message');
      },
      (error)=>{
        this.toastr.error( error.message,'Error Message');
      }
    )
  }

  removeImage(id:number){
    this.galleryService.removeGalleryImage(id).subscribe((res)=>{
      this.galleryDetails = res;
    },
    (error)=>{
      this.toastr.error(error.message,'Error Message');
    }
    )
  }

  closeModal() {
    const cancelButton = document.querySelector('[data-bs-dismiss="modal"]')  as HTMLButtonElement;
    if (cancelButton) {
      cancelButton.click();
    }
  }


  
  public onImageClick(imageSrc: string) {
    console.log("function clicked!")
    this.isClicked = true;
    this.clickedImageSrc = imageSrc;
  }


  closeOverlay(event:any): void {
    console.log(event)
     this.isClicked = false;
   }
  



}
