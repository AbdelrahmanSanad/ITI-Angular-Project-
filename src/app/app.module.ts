import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import{HttpClientModule} from '@angular/common/http';
import { ImagesComponent } from './images/images.component';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserInfoComponent } from './components/user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImagesComponent,
    UserInfoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
