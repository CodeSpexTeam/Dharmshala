import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';

@Component({
  selector: 'app-youths-marriageable',
  templateUrl: './youths-marriageable.component.html',
  styleUrls: ['./youths-marriageable.component.css']
})
export class YouthsMarriageableComponent {

  constructor(private authService:AuthserviceService, private router:Router, private toast:NgToastService){}

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toast.warning({detail:'Info Message', summary:'Please Logout First', duration:5000});
    }

  }

}
