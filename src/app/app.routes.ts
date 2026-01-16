import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { OurValues } from './Components/our-values/our-values';
import { OurProjects } from './Components/our-projects/our-projects';
import { LogIn } from './Components/AuthenticationModels/log-in/log-in';
import { Registration } from './Components/AuthenticationModels/registration/registration';
import { Getdeletedprojects } from './Components/our-projects/getdeletedprojects/getdeletedprojects';
import { Addproject } from './Components/our-projects/addproject/addproject';
import { Updateproject } from './Components/our-projects/updateproject/updateproject';
import { Getdeletedservices } from './Components/ourservices/getdeletedservices/getdeletedservices';
import { Addservice } from './Components/ourservices/addservice/addservice';
import { Updateservice } from './Components/ourservices/updateservice/updateservice';
import { AdminDashboard } from './Components/admin-dashboard/admin-dashboard';
import { Showprojects } from './Components/showprojects/showprojects';
import { Ourservices } from './Components/ourservices/ourservices';
import { OurServiceTypes } from './Components/ourservicetypes/ourservicetypes';
import { Showservicetypes } from './Components/showservicetypes/showservicetypes';
import { Getdeletedservicetypes } from './Components/ourservicetypes/getalldeletedservicetype/getalldeletedservicetype';
import { AddServicetype } from './Components/ourservicetypes/addservicetype/addservicetype';
import { UpdateServicetype } from './Components/ourservicetypes/updateservicetype/updateservicetype';
import { Getdeletedprojectsimages } from './Components/projects-images/getdeletedprojectsimages/getdeletedprojectsimages';
import { ProjectsImages } from './Components/projects-images/projects-images';
import { UpdateProjectImage } from './Components/projects-images/updateprojectimage/updateprojectimage';
import { AddProjectImage } from './Components/projects-images/addprojectimage/addprojectimage';
import { ShowProjectImages } from './Components/show-project-images/show-project-images';
import { AdminProjectImages } from './Components/admin-project-images/admin-project-images';
import { roleauthguardGuard } from './Guards/roleauthguard-guard';
export const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home',component:Home},
{ path: 'ourvalues',component:OurValues},
{ path: 'ourprojects',component:OurProjects},
{ path: 'ourservices',component:Ourservices},
{ path: 'ourservicetypes',component:OurServiceTypes},
{ path: 'showprojects',component:Showprojects},
{ path: 'showservicetypes',component:Showservicetypes},
{ path: 'showservicetypes/:id',component:Showservicetypes},
{ path: 'register',component:Registration},
{ path: 'login',component:LogIn},
{ path: 'showprojectimages/:id',component:ShowProjectImages},
{ path: 'projectimages/:id',component:ProjectsImages},
{ path: 'projectimages', component: ProjectsImages},
{ path: 'addproject', component: Addproject, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'updateproject/:id', component: Updateproject, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'restoredeletedservices', component: Getdeletedservices, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'addservice', component: Addservice, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'updateservice/:id', component: Updateservice, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'restoredeletedservicetypes', component: Getdeletedservicetypes, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'addservicetype', component: AddServicetype, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'updateservicetype/:id', component: UpdateServicetype, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'getdeletedprojectimages', component: Getdeletedprojectsimages, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'addprojectimage', component: AddProjectImage, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'updateprojectimage/:id', component: UpdateProjectImage, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'restoredeletedprojects', component: Getdeletedprojects, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'adminprojectimages', component: AdminProjectImages, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{ path: 'dashboard', component: AdminDashboard, canActivate: [roleauthguardGuard], data: { roles: ['Admin'] } },
{path:'**',redirectTo:'home'},
];