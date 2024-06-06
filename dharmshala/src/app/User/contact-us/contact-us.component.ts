import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AboutService } from 'src/app/admin/admin service/aboutservice/about.service';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';
import { FeedbackService } from 'src/app/admin/admin service/feedbackservice/feedback.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  aboutDetail:any={};
  constructor(private authService:AuthserviceService, private feedBackService:FeedbackService, private aboutService:AboutService, private router:Router, private toastr: ToastrService){}

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toastr.warning('Please Logout First','Info Message');
    }

    this.getAbout();

  }


  getAbout(){
    this.aboutService.getAboutDetail().subscribe((res:any)=>{
      this.aboutDetail = res[0];
      console.log(this.aboutDetail)
    })
  }

  OnSubmitFeedback(feedbackData:any){

    this.feedBackService.addFeedback(feedbackData).subscribe((res:any)=>{
     window.location.reload();
    })

  }


}
