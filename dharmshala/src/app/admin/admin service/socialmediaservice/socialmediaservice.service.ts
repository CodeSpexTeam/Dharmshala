import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SocialmediaserviceService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  public getSocialMediaList(){
    return this.http.get(`${this.baseUrl}/SocialMedia`);
  }

  public getSocialMedia(id:number){
    return this.http.get(`${this.baseUrl}/SocialMedia/${id}`);
  }

  public addSocialMedia(data:any){
    return this.http.post(`${this.baseUrl}/SocialMedia`, data);
  }

  public updateSocialMedia(data:any){
    return this.http.put(`${this.baseUrl}/SocialMedia/${data.id}`, data);
  }

  public deleteSocialMedia(id:number){
    return this.http.delete(`${this.baseUrl}/SocialMedia/${id}`);
  }



}
