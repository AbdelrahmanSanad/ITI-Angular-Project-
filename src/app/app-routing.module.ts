import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ImagesComponent } from './components/images/images.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: HeaderComponent },
  {
    path: 'users/:id',
    component: UserInfoComponent,
    children: [{ path: 'album/:id', component: ImagesComponent }],
  },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  { path: '**', component: ErrorComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
