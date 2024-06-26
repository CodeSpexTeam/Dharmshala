import { Component } from '@angular/core';
import { FacilityserviceService } from '../../admin service/facilityservices/facilityservice.service';
import { ProjectserviceService } from '../../admin service/projectservice/projectservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  constructor(private projectService:ProjectserviceService, private toast:NgToastService, private router:Router){}

  ProjectsList:any[]=[]
  projectsDetails:any={};

  isClicked:boolean = false;
  clickedImageSrc:string|undefined;
  selectedFile: File | undefined;
  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProjects();
    
  }

  getAllProjects(){
    this.projectService.getProjectList().subscribe((res:any)=>{
      this.ProjectsList = res;
      console.log(this.ProjectsList);
    })
  }

  removeProjectFromList(id:number){
    this.projectService.deleteProject(id).subscribe((res:any)=>{
      window.location.reload();
      
    },
    (error)=>{
      this.toast.success({detail:'Success Message',summary:error.error.message, duration:5000});
    }
    )
  }

  getProjectRecord(id:number){
    this.projectService.getProject(id).subscribe((res)=>{
        this.projectsDetails = res;
  });
    
  }

  handleFileInput(event:any){
    this.selectedFile = event.target.files[0];
  }

  editProjectDetails(id:number, data:any){

    Object.keys(data).forEach(key =>{
      if (data[key] === '') {
      delete data[key];
      }
    });
    data['id']=id
    console.log(data);
  
    Object.keys(data).forEach(key1 =>{
      Object.keys(this.projectsDetails).forEach(key2 =>{
       if(key1==key2){
          if(data[key1]!=this.projectsDetails[key2]){
            this.projectsDetails[key2] = data[key1];
            // console.log("key2 " + this.memberDetail[key2]);
          }
        }
      })
    });


    if (!this.selectedFile) {
      console.error('Please select a profile image.');
      return;
    }



    const formData = new FormData();

    formData.append('id', this.projectsDetails.id);
    formData.append('title', this.projectsDetails.title);
    formData.append('description',  this.projectsDetails.description);
    formData.append('imageName',this.selectedFile);


    this.projectService.updateProject(id,formData).subscribe((res:any)=>{
      this.closeModal();
      this.getAllProjects();
      this.toast.success({detail:'Success Message', summary:res.message, duration:5000})
    },
    (error)=>{
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000})
    }
    );

  }

  removeImage(id:number){
    this.projectService.deleteFacilityImages(id).subscribe((res)=>{
      this.projectsDetails = res;
    },
    (error)=>{
      this.toast.error({detail:'Error Message',summary:error.message, duration:5000});
    }
    );
  }

  closeModal() {
    const cancelButton = document.querySelector('[data-bs-dismiss="modal"]')  as HTMLButtonElement;
    if (cancelButton) {
      cancelButton.click();
      window.location.reload();
    }
  }


  public onImageClick(imageSrc: string) {
    console.log("function clicked!")
    this.isClicked = true;
    this.clickedImageSrc = imageSrc;
  }


  closeOverlay(event:any): void {
    console.log(event)
     this.isClicked = false;
   }


  

}
