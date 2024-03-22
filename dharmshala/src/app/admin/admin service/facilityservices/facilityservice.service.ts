import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FacilityserviceService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  public getFacilityList(){
    return this.http.get(`${this.baseUrl}/Facilities`);
  }

  public getFacility(id:number){
    return this.http.get(`${this.baseUrl}/Facilities/${id}`);
  }

  public deleteFacility(id:number){
    return this.http.delete(`${this.baseUrl}/Facilities/${id}`);
  }

  public deleteFacilityImages(id:number){
    return this.http.post(`${this.baseUrl}/Facilities/${id}`,id);
  }

  public addFacility(data:any){
    return this.http.post(`${this.baseUrl}/Facilities`, data);
  }

  public updatedFacility(data:any){
    debugger
    return this.http.put(`${this.baseUrl}/Facilities/${data.id}`, data);
  }
}
