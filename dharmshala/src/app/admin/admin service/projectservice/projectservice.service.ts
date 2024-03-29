import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectserviceService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  public getProjectList(){
    return this.http.get(`${this.baseUrl}/Projects`);
  }

  public getProject(id:number){
    return this.http.get(`${this.baseUrl}/Projects/${id}`);
  }

  public addProject(data:any){
    return this.http.post(`${this.baseUrl}/Projects`, data);
  }

  public updateProject(data:any){
    return this.http.put(`${this.baseUrl}/Projects/${data.id}`, data);
  }

  public deleteProject(id:number){
    return this.http.delete(`${this.baseUrl}/Projects/${id}`);
  }

  public deleteFacilityImages(id:number){
    return this.http.post(`${this.baseUrl}/Projects/${id}`,id);
  }

}
