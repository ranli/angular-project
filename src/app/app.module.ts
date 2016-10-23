import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { HomePageComponent } from './home-page/home-page.component';
import { MyPageComponent } from './my-page/my-page.component';
import * as firebase from 'firebase';
import { MaterialModule } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';
import { LoginPageComponent } from './login-page/login-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ImageServiceService } from './image-service.service';
import { ToListPipe } from './to-list.pipe';
import { ListSlicePipe } from './list-slice.pipe';

const firebaseConfig = {
    apiKey: "AIzaSyCdqRFQKt1LUzxmDaZ47yW0pV9NGaKtjFg",
    authDomain: "imagepost-9787d.firebaseapp.com",
    databaseURL: "https://imagepost-9787d.firebaseio.com",
    storageBucket: "gs://imagepost-9787d.appspot.com",
    messagingSenderId: "675694252389"
};


firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MyPageComponent,
    LoginPageComponent,
    DetailPageComponent,
    ToListPipe,
    ListSlicePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MasonryModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot([
        {
          path: 'allimages',
          component: HomePageComponent  
        },
        {
          path: 'myimages',
          component: MyPageComponent
        },
        {
          path: 'login',
          component: LoginPageComponent
        },
        {
          path: 'detail/:uid',
          component: DetailPageComponent
        },
        {
          path: '',
          redirectTo: '/login',
          pathMatch: 'full'
        }
      ]),
    MaterialModule.forRoot(),
  ],
  providers: [ImageServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
