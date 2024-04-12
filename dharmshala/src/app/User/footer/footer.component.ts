import { Component } from '@angular/core';
import { FacilityserviceService } from 'src/app/admin/admin service/facilityservices/facilityservice.service';
import { ProjectserviceService } from 'src/app/admin/admin service/projectservice/projectservice.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  facilityDetail:any[]=[]
  topFourFacility:any = [];
  topFourProject:any = [];
 
  constructor(private projectService:ProjectserviceService, private facilityService:FacilityserviceService ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getFacilitiesDetail();
    this.getprojectDetail();
  }


  getFacilitiesDetail(){

  const test:any = [];

   this.facilityService.getFacilityList().subscribe((res:any)=>{
      this.facilityDetail = res;


      this.facilityDetail.forEach(element => {
          
        if(!test.includes(element.facilityName)){
          test.push(element.facilityName);
        }
      });

      if(test.lenght>4){
        this.topFourFacility = test.slice(0,4)
      }else{
        this.topFourFacility = test;
      }

      console.log(this.topFourFacility);
      
    });
  }


  getprojectDetail(){

    var allProject:any[] = [];
    const removedDuplicatedProjectName:any = [];
    this.projectService.getProjectList().subscribe((res:any)=>{
      allProject = res;

      
      allProject.forEach(element => {
          
        if(!removedDuplicatedProjectName.includes(element.title)){
          removedDuplicatedProjectName.push(element.title);
        }
      });

      if(removedDuplicatedProjectName.lenght>4){
        this.topFourProject = removedDuplicatedProjectName.slice(0,4)
      }else{
        this.topFourProject = removedDuplicatedProjectName;
      }

      console.log(this.topFourProject);



    })
      
  }



  



}
