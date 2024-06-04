import { Component } from '@angular/core';
import { FeedbackService } from 'src/app/admin/admin service/feedbackservice/feedback.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {
  constructor(private feedBackService:FeedbackService) {}

  OnSubmitFeedback(feedbackData:any){

    this.feedBackService.addFeedback(feedbackData).subscribe((res:any)=>{
     window.location.reload();
    })

  }
}
