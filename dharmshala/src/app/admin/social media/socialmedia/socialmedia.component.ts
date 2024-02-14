import { Component } from '@angular/core';
import { SocialmediaserviceService } from '../../admin service/socialmediaservice/socialmediaservice.service';

@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.css']
})
export class SocialmediaComponent {

  constructor(private socialMediaService:SocialmediaserviceService){}
  socialMediaList:any[]=[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getSocialMediaList();
    
  }


  getSocialMediaList(){
    this.socialMediaService.getSocialMediaList().subscribe((res:any)=>{
      this.socialMediaList= res;
    })
  }

  removeSocialMedia(id:number){
    this.socialMediaService.deleteSocialMedia(id).subscribe((res)=>{
        console.log(res);
    });
  }




}
