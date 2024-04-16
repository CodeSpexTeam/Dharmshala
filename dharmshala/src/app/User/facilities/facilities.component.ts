import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';
import { FacilityserviceService } from 'src/app/admin/admin service/facilityservices/facilityservice.service';


@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent {
  facilityDetail:any[]=[];
  facilityObjectData :any = [];
  isClicked:boolean = false;
  clickedImageSrc:string|undefined;
  constructor(private authService:AuthserviceService, private facilityService:FacilityserviceService, private router:Router, private toast:NgToastService){}

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toast.warning({detail:'Info Message', summary:'Please Logout First', duration:5000});

    }

    this.getFacilitiesDetail();

  }

  getFacilitiesDetail(){
    const test:any = [];
    
   
   this.facilityService.getFacilityList().subscribe((res:any)=>{
      this.facilityDetail = res;

      this.facilityDetail.forEach(element => {
          
        if(!test.includes(element.facilityName)){
          test.push(element.facilityName);
        }
      });

    console.log(test)

    
    test.forEach((element:any) => {
      this.facilityObjectData.push(this.facilityDetail.filter(x=>x.facilityName==element));
    });

    console.log(this.facilityObjectData)


    });

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


