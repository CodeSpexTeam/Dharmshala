import { Component } from '@angular/core';
import { FeedbackService } from '../admin service/feedbackservice/feedback.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  feedbackList:any[]=[];
  feedback:any={};

  constructor(private feedbackService:FeedbackService , private router:Router, private toastr: ToastrService){
    this.getAllFeedback();
  }

  getAllFeedback(){
    this.feedbackService.getFeedbackList().subscribe((res:any)=>{
      this.feedbackList = res;
    })
  }


  deleteFacility(id:number){
    this.feedbackService.deleteFeedbackFromList(id).subscribe((res:any)=>{
      window.location.reload();
      
    },
    (error)=>{
      this.toastr.error(error.message,'Error Message')
    }
  );
  }

  viewComment(id:number){
    this.feedbackService.getComment(id).subscribe((res:any)=>{
      this.feedback = res;
    },
  (error)=>{
    this.toastr.error(error.message,'Error Message')
  });
  }


}
