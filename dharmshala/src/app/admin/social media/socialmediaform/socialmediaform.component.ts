import { Component } from '@angular/core';
import { SocialmediaserviceService } from '../../admin service/socialmediaservice/socialmediaservice.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socialmediaform',
  templateUrl: './socialmediaform.component.html',
  styleUrls: ['./socialmediaform.component.css']
})
export class SocialmediaformComponent {

  constructor(private socialMediaService:SocialmediaserviceService,private toast:NgToastService, private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  onSubmitSocialMedia(data:any){
    this.socialMediaService.addSocialMedia(data).subscribe((res)=>{
      this.router.navigate(['/social-media']);
      this.toast.success({detail:'Success Message', summary:'New Media has been added Successfuly!'});
    },
    (error)=>{
      this.toast.error({detail:'Error Message', summary:error.message,duration:5000});
    }
    )
  }

  


  

}
