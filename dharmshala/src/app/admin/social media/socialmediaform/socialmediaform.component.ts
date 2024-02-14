import { Component } from '@angular/core';
import { SocialmediaserviceService } from '../../admin service/socialmediaservice/socialmediaservice.service';

@Component({
  selector: 'app-socialmediaform',
  templateUrl: './socialmediaform.component.html',
  styleUrls: ['./socialmediaform.component.css']
})
export class SocialmediaformComponent {

  constructor(private socialMediaService:SocialmediaserviceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  onSubmitSocialMedia(data:any){
    this.socialMediaService.addSocialMedia(data).subscribe((res)=>{
      console.log(res);
    })
  }

  


  

}
