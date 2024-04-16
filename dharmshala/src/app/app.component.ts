import { Component } from '@angular/core';
import { AuthserviceService } from './admin/admin service/authservice/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dharmshala';
  islogin:boolean = false;
  
  constructor(private authService:AuthserviceService){}

  ngOnInit(): void {
    this.islogin  = this.authService.isLoggedIn();
  }
  



}
