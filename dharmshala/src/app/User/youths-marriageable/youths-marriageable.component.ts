import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';

@Component({
  selector: 'app-youths-marriageable',
  templateUrl: './youths-marriageable.component.html',
  styleUrls: ['./youths-marriageable.component.css']
})
export class YouthsMarriageableComponent {

  constructor(private authService:AuthserviceService, private router:Router, private toastr: ToastrService){}

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toastr.warning('Please Logout First','Info Message');

    }

  }

}
