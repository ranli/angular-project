import { Component, OnInit } from '@angular/core';
import { ImageServiceService } from '../image-service.service'
import { Router }  from '@angular/router';
import { AngularFire} from 'angularfire2';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  images: any;
  preview: boolean;
  user:any;
  length:number;
  constructor(private imageService: ImageServiceService, public router: Router,public af:AngularFire){
      this.af.auth.subscribe(res => this.user = res);
  		this.images = this.imageService.getAllImages();
      this.preview = false;
      this.length = 3;
  }

  ngOnInit() {
    
  }

  gotoDetail(image): void {
    let link = ['/detail', image.authorId];
    this.router.navigate(link);
  }

  updateLikes(image){
      this.imageService.updateLikes(image);
  }

  updateComments($event,image){
    this.imageService.updateComments(image,$event.target.value,this.user.auth.displayName);
  }
  addLength(){
    this.length += 3;
  }
  openImage(url){
    var img = <HTMLInputElement>document.querySelector('.largeImg');
    img.src = url;
    console.log(img);
    this.preview = true;
  }

  closeImage(){
    this.preview = false;
  }
}
