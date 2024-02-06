import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './admin/signin/signin/signin.component';
import { DashboardComponent } from './admin/dashboard/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about/about.component';
import { MemberComponent } from './admin/member/member/member.component';
import { ProjectsComponent } from './admin/project/projects/projects.component';
import { GalleryComponent } from './admin/gallery/gallery/gallery.component';
import { SocialmediaComponent } from './admin/social media/socialmedia/socialmedia.component';
import { FacilityComponent } from './admin/facility/facility/facility.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'member', component: MemberComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'social-media', component: SocialmediaComponent },
  { path: 'facility', component: FacilityComponent },
  { path: '**', component: SigninComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
