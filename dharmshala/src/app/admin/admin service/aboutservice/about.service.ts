import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;


  getAboutDetail(){
    return this.http.get(`${this.baseUrl}/About`);
  }

  saveAboutDetail(data:any){
    return this.http.post(`${this.baseUrl}/About`, data);
  }


  

  







}
