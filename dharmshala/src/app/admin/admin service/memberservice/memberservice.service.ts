import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Members,adminCreateAccount } from '../../iterface/_memberInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberserviceService {

  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  public getMemberList(){
   return this.http.get(`${this.baseUrl}/Members`);
  }

  public saveMember(data:Members){
    return this.http.post(`${this.baseUrl}/Members`, data);
  }


  public removeMemberFromList(id:number){
    return this.http.delete(`${this.baseUrl}/Members/${id}`);
  }

  public getMemberDetail(id:number){
      return this.http.get(`${this.baseUrl}/Members/${id}`);
  }

  public editMemberDetail(data:Members){
    debugger
    return this.http.put(`${this.baseUrl}/Members/${data.id}`, data);
  }

  public getAdminMemberList(){
    return this.http.get(`${this.baseUrl}/Auth`);
   }

  public removeAdminFromList(id:number){
   
    return this.http.delete(`${this.baseUrl}/Auth/${id}`);
   }

   public createAdminMember(data:adminCreateAccount){
    return this.http.post(`${this.baseUrl}/Auth`, data);
   }
   
   public IsSuperAdminExists(){
    return this.http.get(`${this.baseUrl}/Members/IsSuperAdminExists`);
   }

   

  

}
