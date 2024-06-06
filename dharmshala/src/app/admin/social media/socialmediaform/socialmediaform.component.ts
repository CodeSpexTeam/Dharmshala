import { Component } from '@angular/core';
import { SocialmediaserviceService } from '../../admin service/socialmediaservice/socialmediaservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socialmediaform',
  templateUrl: './socialmediaform.component.html',
  styleUrls: ['./socialmediaform.component.css']
})
export class SocialmediaformComponent {

  constructor(private socialMediaService:SocialmediaserviceService, private router:Router, private toastr: ToastrService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  onSubmitSocialMedia(data:any){
    this.socialMediaService.addSocialMedia(data).subscribe((res)=>{
      this.router.navigate(['/social-media']);
      this.toastr.success('New Media has been added Successfuly!','Success Message');
    },
    (error)=>{
      this.toastr.error(error.message,'Error Message');
    }
    )
  }

  


  

}
