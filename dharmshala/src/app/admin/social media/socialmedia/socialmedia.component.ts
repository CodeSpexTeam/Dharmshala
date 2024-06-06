import { Component } from '@angular/core';
import { SocialmediaserviceService } from '../../admin service/socialmediaservice/socialmediaservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.css']
})
export class SocialmediaComponent {

  constructor(private socialMediaService:SocialmediaserviceService, private toastr: ToastrService){}
  socialMediaList:any[]=[];
  sociaoMediaDetails:any={};

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getSocialMediaList();
    
  }


  getSocialMediaList(){
    this.socialMediaService.getSocialMediaList().subscribe((res:any)=>{
      this.socialMediaList= res;
    })
  }

  removeSocialMedia(id:number){
    this.socialMediaService.deleteSocialMedia(id).subscribe((res)=>{
        window.location.reload();
    },(error)=>{
      this.toastr.error(error.message,'Error Message');
    });
  }

  getProjectRecord(id:number){
    this.socialMediaService.getSocialMedia(id).subscribe((res:any)=>{
      this.sociaoMediaDetails = res;
    },
    (error)=>{
      this.toastr.error(error.message,'Error Message');
    });
    
  }

  editSocialMediaDetails(id:number, data:any){
    Object.keys(data).forEach(key =>{
      if (data[key] === '') {
      delete data[key];
      }
    });
    data['id']=id
    console.log(data);
  
    Object.keys(data).forEach(key1 =>{
      Object.keys(this.sociaoMediaDetails).forEach(key2 =>{
       if(key1==key2){
          if(data[key1]!=this.sociaoMediaDetails[key2]){
            this.sociaoMediaDetails[key2] = data[key1];
            // console.log("key2 " + this.memberDetail[key2]);
          }
        }
      })
    });


    this.socialMediaService.updateSocialMedia(this.sociaoMediaDetails).subscribe((res:any)=>{
      this.closeModal();
      this.getSocialMediaList();
      this.toastr.success(res.message,'Success Message');
    },
    (error)=>{
      this.toastr.error(error.message,'Error Message');
    }
    );
  }

  closeModal() {
    const cancelButton = document.querySelector('[data-bs-dismiss="modal"]')  as HTMLButtonElement;
    if (cancelButton) {
      cancelButton.click();
    }
  }



}
