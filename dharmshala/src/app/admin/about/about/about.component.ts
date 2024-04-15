import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AboutService } from '../../admin service/aboutservice/about.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  aboutDetailList:any[]=[]
  aboutDetail:any={}


  aboutFrom = new FormGroup({
    trustEmailId: new FormControl(),
    trustAddress: new FormControl(),
    trustPhoneNumber: new FormControl(),
    bookingNumber: new FormControl(),
    trustImage: new FormControl(),
   
  });

  constructor( private  aboutService:AboutService,private toast:NgToastService){}

  ngOnInit(): void {
    this.getAbout();
  }

  getAbout(){
    this.aboutService.getAboutDetail().subscribe((res:any)=>{
      this.aboutDetail = res[0];
      console.log(this.aboutDetail)
    })
  }


  editAboutDetails(id:number, data:any){
    
    Object.keys(data).forEach(key =>{
      if (data[key] === '') {
      delete data[key];
      }
    });
    data['id']=id
    console.log(data);
  
    Object.keys(data).forEach(key1 =>{
      Object.keys(this.aboutDetail).forEach(key2 =>{
       if(key1==key2){
          if(data[key1]!=this.aboutDetail[key2]){
            this.aboutDetail[key2] = data[key1];
            // console.log("key2 " + this.memberDetail[key2]);
          }
        }
      })
    });


    console.log(this.aboutDetail);

    this.aboutService.updateAboutDetail(this.aboutDetail.id, this.aboutDetail).subscribe((res:any)=>{
      this.toast.success({detail:'Success Message', summary:res.message, duration:5000})
    },
    (error)=>{
      this.toast.error({detail:'Error Message', summary:error.message, duration:5000})
    }
    );

    
  }
}
