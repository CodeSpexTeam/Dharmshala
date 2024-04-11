import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';
import { GalleryserviceService } from 'src/app/admin/admin service/galleryservice/galleryservice.service';
import { MemberserviceService } from 'src/app/admin/admin service/memberservice/memberservice.service';
import { Members } from 'src/app/admin/iterface/_memberInterface';

@Component({
  selector: 'app-trust',
  templateUrl: './trust.component.html',
  styleUrls: ['./trust.component.css']
})
export class TrustComponent {

  data:Members[]=[];
  galleryList:any[]=[];
  
  constructor(private authService:AuthserviceService, private memberService:MemberserviceService, private galleryService:GalleryserviceService, private router:Router, private toast:NgToastService){}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toast.warning({detail:'Info Message', summary:'Please Logout First', duration:5000});
    }

    this.getgalleryImage();
    this.getMemberDetail();
    
  }

  getMemberDetail(){
    this.memberService.getMemberList().subscribe((res:any)=>{
      this.data = res;
      this.data= this.data.filter(m=>m.role != "Admin");
      console.log(this.data);
    },
    (error)=>{

    }
  );
  }

  getgalleryImage(){
    this.galleryService.getGalleryList().subscribe((res:any)=>{
      this.galleryList = res;
      this.galleryList= this.galleryList.filter(m=>m.role != "Admin");
      console.log(this.galleryList);
    },
    (error)=>{

    }
  );
  }


}
