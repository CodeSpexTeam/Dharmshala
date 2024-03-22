import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GalleryserviceService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;


  public getGalleryList(){
    return this.http.get(`${this.baseUrl}/Gallery`);
  }

  public getGallery(id:number){
    return this.http.get(`${this.baseUrl}/Gallery/${id}`);
  }

  public deleteGallery(id:number){
    return this.http.delete(`${this.baseUrl}/Gallery/${id}`);
  }

  public updateGallery(data:any){
    return this.http.put(`${this.baseUrl}/Gallery/${data.id}`, data);
  }

  public addGallery(data:any){
    return this.http.post(`${this.baseUrl}/Gallery`, data);
  }

  public removeGalleryImage(id:number){
    return this.http.post(`${this.baseUrl}/Gallery/${id}`, id);
  }

}
