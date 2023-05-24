import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ImagesComponent } from './components/images/images.component';

const routes: Routes =
[
  {path:'',redirectTo:'users',pathMatch:'full'},
  {path:'users',component:HeaderComponent},
  {path:'users/:id',component:UserInfoComponent},
  {path:'photos?albumId=:id&userId=:id',component:ImagesComponent},
  {path:'**',component:ImagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
