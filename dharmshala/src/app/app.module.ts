import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './admin/navbar/nav/nav.component';
import { SigninComponent } from './admin/signin/signin/signin.component';
import { DashboardComponent } from './admin/dashboard/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about/about.component';
import { MemberComponent } from './admin/member/member/member.component';
import { ProjectsComponent } from './admin/project/projects/projects.component';
import { GalleryComponent } from './admin/gallery/gallery/gallery.component';
import { SocialmediaComponent } from './admin/social media/socialmedia/socialmedia.component';
import { FacilityComponent } from './admin/facility/facility/facility.component';
import { MemberformComponent } from './admin/member form/memberform/memberform.component';
import { FacilityformComponent } from './admin/facility form/facilityform/facilityform.component';
import { UploadimageComponent } from './admin/uploadimage/uploadimage.component';
import { AddprojectsComponent } from './admin/addprojects/addprojects.component';
import { MembereditformComponent } from './admin/member form/membereditform/membereditform.component';
import { SocialmediaformComponent } from './admin/social media/socialmediaform/socialmediaform.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SignupComponent } from './admin/signup/signup/signup.component';
import { HomeComponent } from './User/home/home.component';
import { FooterComponent } from './User/footer/footer.component';
import { TrustComponent } from './User/trust/trust.component';
import { UserNavComponent } from './User/user-nav/user-nav.component';
import { FacilitiesComponent } from './User/facilities/facilities.component';
import { OtherProjectsComponent } from './User/other-projects/other-projects.component';
import { PhotoGalleryComponent } from './User/photo-gallery/photo-gallery.component';
import { ContactUsComponent } from './User/contact-us/contact-us.component';
import { LogoComponent } from './User/logo/logo.component';
import { YouthsMarriageableComponent } from './User/youths-marriageable/youths-marriageable.component';
import { FeedbackComponent } from './admin/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SigninComponent,
    DashboardComponent,
    AboutComponent,
    MemberComponent,
    ProjectsComponent,
    GalleryComponent,
    SocialmediaComponent,
    FacilityComponent,
    MemberformComponent,
    FacilityformComponent,
    UploadimageComponent,
    AddprojectsComponent,
    MembereditformComponent,
    SocialmediaformComponent,
    SignupComponent,
    HomeComponent,
    FooterComponent,
    TrustComponent,
    UserNavComponent,
    FacilitiesComponent,
    OtherProjectsComponent,
    PhotoGalleryComponent,
    ContactUsComponent,
    LogoComponent,
    YouthsMarriageableComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgToastModule,
    ReactiveFormsModule
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
