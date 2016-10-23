import { Component, OnInit} from '@angular/core';
import { AngularFire, AuthMethods,AuthProviders} from 'angularfire2';
import { Router} from '@angular/router';
import { ImageServiceService } from '../image-service.service'
@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})

export class MyPageComponent implements OnInit {

  images: any;
  open:boolean;
  constructor(public af:AngularFire, public router:Router, public imageService:ImageServiceService){
      this.af.auth.subscribe(auth => {
        if(!auth){
          this.router.navigateByUrl('/login');
        }else{
          this.images = this.imageService.getMyImages(auth.uid);
        } 
      });
  		this.open = false;
  }

  ngOnInit() {
  }
  openComment(){
    if(this.open){
      this.open = false;
    }else{
      this.open = true;
    }
  }

}
