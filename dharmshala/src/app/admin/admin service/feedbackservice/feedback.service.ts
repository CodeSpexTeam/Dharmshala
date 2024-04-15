import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;


  getFeedbackList(){
    return this.http.get(`${this.baseUrl}/Feedbacks`);
  }


   deleteFeedbackFromList(id:number){
    return this.http.delete(`${this.baseUrl}/Feedbacks/${id}`);
  }

  getComment(id:number){
    return this.http.get(`${this.baseUrl}/Feedbacks/${id}`);
  }

  addFeedback(data:any){
    return this.http.post(`${this.baseUrl}/Feedbacks`, data);
  }


}
