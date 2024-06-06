import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/admin/admin service/authservice/authservice.service';
import { MemberserviceService } from 'src/app/admin/admin service/memberservice/memberservice.service';
import { Members } from 'src/app/admin/iterface/_memberInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data:Members[]=[];

  constructor(private authService:AuthserviceService, private router:Router, private toastr: ToastrService, private memberService:MemberserviceService){}

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.toastr.warning('Please Logout First','Info Message');

    }

    this.getMemberDetail();

  }

  getMemberDetail(){
    this.memberService.getMemberList().subscribe((res:any)=>{
      this.data = res;
      this.data= this.data.filter(m=>m.role != "Admin");
      // console.log(this.data);
    },
    (error)=>{

    }
  );
  }

}
