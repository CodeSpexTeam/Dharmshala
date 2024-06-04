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
  showComponent: boolean = true;
  
  constructor(private authService:AuthserviceService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.islogin  = this.authService.isLoggedIn();

    this.router.events.subscribe(() => {
      this.checkRoute();
    });

    // Check the route initially
    this.checkRoute();
  }
  checkRoute(): void {
    const currentRoute = this.route.snapshot.routeConfig?.path;
    this.showComponent = currentRoute == 'admin';
  }



}
