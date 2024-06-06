import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  
  userPayload:any;
  constructor(private http: HttpClient, private router:Router) { 
    this.userPayload = this.decodeToken();
  }
  baseUrl = environment.apiUrl;

  onSubmitLoginForm(data:any){
    return this.http.post(`${this.baseUrl}/Auth/Login`,data);
  }

  onSubmitSignUpForm(data:any){
    return this.http.post(`${this.baseUrl}/Auth/Login`,data);
  }

  setToken(token:string){
    localStorage.setItem("access_token", token);
  }

  isLoggedIn():boolean{
   return localStorage.getItem("access_token")? true : false;
  }


  getToken(){
    return localStorage.getItem("access_token");
   }

  isLogOut():boolean{
   localStorage.clear();
   return true;
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    // console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }
  
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoledFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  getAdminIdFromToken(){
    if(this.userPayload)
    return this.userPayload.id;
  }

}
