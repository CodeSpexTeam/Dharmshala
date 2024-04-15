import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  constructor(private authService:AuthserviceService, private feedBackService:FeedbackService, private aboutService:AboutService, private router:Router, private toast:NgToastService){}

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toast.warning({detail:'Info Message', summary:'Please Logout First', duration:5000});

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
