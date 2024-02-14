import { Component } from '@angular/core';
import { FacilityserviceService } from '../../admin service/facilityservices/facilityservice.service';

@Component({
  selector: 'app-facilityform',
  templateUrl: './facilityform.component.html',
  styleUrls: ['./facilityform.component.css']
})
export class FacilityformComponent {

  constructor(private facilityService:FacilityserviceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  OnSubmitFacility(data:any){
    this.facilityService.addFacility(data).subscribe((res:any)=>{
      console.log(res);
    });

    
  }

}
