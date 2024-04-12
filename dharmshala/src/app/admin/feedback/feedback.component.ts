import { Component } from '@angular/core';
import { FeedbackService } from '../admin service/feedbackservice/feedback.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  feedbackList:any[]=[];
  feedback:any={};

  constructor(private feedbackService:FeedbackService , private router:Router,private toast:NgToastService){
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
      this.toast.error({detail:'Error Message', summary:error.message,duration:5000})
    }
  );
  }

  viewComment(id:number){
    this.feedbackService.getComment(id).subscribe((res:any)=>{
      this.feedback = res;
    },
  (error)=>{
    this.toast.error({detail:'Error Message', summary:error.message,duration:5000})
  });
  }


}
