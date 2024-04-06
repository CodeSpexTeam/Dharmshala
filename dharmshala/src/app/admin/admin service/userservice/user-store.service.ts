import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private Role$ = new BehaviorSubject<string>("");
  constructor() { }

  public getRoleFromStore(){
    return this.Role$.asObservable();
  }

  public setRoleFromStore(role:string){
    this.Role$.next(role);
  }

  
  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameFromStore(fullname:string){
    this.fullName$.next(fullname);
  }



}
