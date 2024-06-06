import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';
import { GalleryserviceService } from 'src/app/admin/admin service/galleryservice/galleryservice.service';
import { MemberserviceService } from 'src/app/admin/admin service/memberservice/memberservice.service';
import { Members } from 'src/app/admin/iterface/_memberInterface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trust',
  templateUrl: './trust.component.html',
  styleUrls: ['./trust.component.css']
})
export class TrustComponent {

  data:Members[]=[];
  galleryList:any[]=[];
  
  constructor(private authService:AuthserviceService, private memberService:MemberserviceService, private galleryService:GalleryserviceService, private router:Router, private toastr: ToastrService){}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toastr.warning('Please Logout First','Info Message');


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
