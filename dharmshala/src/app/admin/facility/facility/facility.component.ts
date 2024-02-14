import { Component } from '@angular/core';
import { FacilityserviceService } from '../../admin service/facilityservices/facilityservice.service';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent {

  constructor(private facilityService:FacilityserviceService){};

  facilityDetail:any[]=[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllFacility();
    
  }


  getAllFacility(){
    this.facilityService.getFacilityList().subscribe((res:any)=>{
      this.facilityDetail = res;
    });
  }

  deleteFacility(id:number){
    this.facilityService.deleteFacility(id).subscribe((res:any)=>{
      
    });
  }

  

}
