import { Component } from '@angular/core';
import { FacilityserviceService } from '../../admin service/facilityservices/facilityservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-facilityform',
  templateUrl: './facilityform.component.html',
  styleUrls: ['./facilityform.component.css']
})
export class FacilityformComponent {

  constructor(private facilityService:FacilityserviceService,private toast:NgToastService, private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  OnSubmitFacility(data:any){
    this.facilityService.addFacility(data).subscribe((res:any)=>{
      console.log(res);
      this.router.navigate(['/facility']);
      this.toast.success({detail:'Success Message', summary:"New facility has been added!", duration:5000});
    },
    (error)=>{
      this.router.navigate(['/facility']);
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000});
    }
    );

  }

}
