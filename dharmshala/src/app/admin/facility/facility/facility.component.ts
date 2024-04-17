import { Component } from '@angular/core';
import { FacilityserviceService } from '../../admin service/facilityservices/facilityservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent {

  constructor(private facilityService:FacilityserviceService, private toast:NgToastService, private router:Router){};

  facilityDetail:any[]=[];
  facilityDetails:any={}
  removeImageBtn:boolean = false;
  isClicked:boolean = false;
  clickedImageSrc:string|undefined;
  selectedFile: File | undefined;
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllFacility();
    
  }


  getAllFacility(){
    this.facilityService.getFacilityList().subscribe((res:any)=>{
      this.facilityDetail = res;

      console.log(this.facilityDetail);
    });
  }

  deleteFacility(id:number){
    this.facilityService.deleteFacility(id).subscribe(()=>{
      window.location.reload();
    },
    (error)=>{
      this.toast.error({detail:'Error Message',summary:error.message, duration:5000});
    }
    );
  }

  getFacilityRecord(id:number){
    this.facilityService.getFacility(id).subscribe((res)=>{
      this.facilityDetails = res;
      console.log(this.facilityDetails);
    });
  }


  handleFileInput(event:any){
    this.selectedFile = event.target.files[0];
  }

  editFacilityDetails(id:number, data:any){
    
    Object.keys(data).forEach(key =>{
      if (data[key] === '') {
      delete data[key];
      }
    });
    data['id']=id
    console.log(data);
  
    Object.keys(data).forEach(key1 =>{
      Object.keys(this.facilityDetails).forEach(key2 =>{
       if(key1==key2){
          if(data[key1]!=this.facilityDetails[key2]){
            this.facilityDetails[key2] = data[key1];
            // console.log("key2 " + this.memberDetail[key2]);
          }
        }
      })
    });


    console.log( this.facilityDetails);

    if (!this.selectedFile) {
      console.error('Please select a profile image.');
      return;
    }



    const formData = new FormData();

    formData.append('id', this.facilityDetails.id);
    formData.append('facilityName', this.facilityDetails.facilityName);
    formData.append('fees',  this.facilityDetails.fees);
    formData.append('description',  this.facilityDetails.description);
    formData.append('imageName',this.selectedFile);

    this.facilityService.updatedFacility(id,formData).subscribe((res:any)=>{
      this.closeModal();
      this.getAllFacility();
      this.toast.success({detail:'Success Message', summary:res.message, duration:5000})
    },
    (error)=>{
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000})
    }
    );

    
  }

  removeImage(id:any){
    this.facilityService.deleteFacilityImages(id).subscribe((res)=>{
      this.facilityDetails = res;
    },
    (error)=>{
      this.toast.error({detail:'Error Message',summary:error.message, duration:5000});
    }
    );
    // this.removeImageBtn = true;
  }


  closeModal() {
    const cancelButton = document.querySelector('[data-bs-dismiss="modal"]')  as HTMLButtonElement;
    if (cancelButton) {
      cancelButton.click();
      window.location.reload();
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
