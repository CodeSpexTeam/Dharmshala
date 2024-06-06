import { Component } from '@angular/core';
import { AuthserviceService } from './admin/admin service/authservice/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dharmshala';
  islogin:boolean = false;
  
  constructor(private authService:AuthserviceService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.islogin  = this.authService.isLoggedIn();


  }



}
