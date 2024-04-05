import { Component } from '@angular/core';
import { AuthserviceService } from '../../admin service/authservice/authservice.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private authService:AuthserviceService){}

  ngOnInit(): void {
    let usernameFromToken = this.authService.getUsernameFromToken();
    this.getUser(usernameFromToken);
    
  }

  getUser(username:string){}

  

}
