import { Component } from '@angular/core';
import { SocialmediaserviceService } from '../../admin service/socialmediaservice/socialmediaservice.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.css']
})
export class SocialmediaComponent {

  constructor(private socialMediaService:SocialmediaserviceService, private toast:NgToastService){}
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
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000});
    });
  }

  getProjectRecord(id:number){
    this.socialMediaService.getSocialMedia(id).subscribe((res:any)=>{
      this.sociaoMediaDetails = res;
    },
    (error)=>{
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000});
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
      this.toast.success({detail:'Success Message', summary:res.message, duration:5000});
    },
    (error)=>{
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000});
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
