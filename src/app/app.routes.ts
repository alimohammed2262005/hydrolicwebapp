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
    { path: 'restoredeletedprojects',component:Getdeletedprojects},
    { path: 'addproject',component:Addproject},
    { path: 'updateproject/:id',component:Updateproject},
    { path: 'restoredeletedservices',component:Getdeletedservices},
    { path: 'addservice',component:Addservice},
    { path: 'updateservice/:id',component:Updateservice},
     { path: 'restoredeletedservicetypes',component:Getdeletedservicetypes},
    { path: 'addservicetype',component:AddServicetype},
    { path: 'updateservicetype/:id',component:UpdateServicetype},
    { path: 'projectimages',component:ProjectsImages},
    { path: 'getdeletedprojectimages',component:Getdeletedprojectsimages},
    { path: 'addprojectimage',component:AddProjectImage},
    { path: 'updateprojectimage/:id',component:UpdateProjectImage},
    { path: 'showprojectimages/:id',component:ShowProjectImages},
    { path: 'projectimages/:id',component:ProjectsImages},
    { path: 'adminprojectimages',component:AdminProjectImages},
    { path: 'dashboard',component:AdminDashboard},
    {path:'**',redirectTo:'home'},
];