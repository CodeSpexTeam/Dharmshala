import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    MemberformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
