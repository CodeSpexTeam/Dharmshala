import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  onSubmitLoginForm(email:any, password:any){
    return this.http.post(`${this.baseUrl}/Auth/Login`,email , password);
  }

}
