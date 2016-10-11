import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router }  from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  images: FirebaseListObservable<any[]>;
  preview:boolean;
  constructor(public af:AngularFire, public router: Router){
  		this.images = af.database.list('/images',{query: {orderByChild: 'likes'}});
      this.preview = false;
  }

  ngOnInit() {
    
  }

  gotoDetail(image): void {
    let link = ['/detail', image.authorId];
    this.router.navigate(link);
  }
  updateLikes(image){
      var likes = Number(image.likes) + 1;
      var item = this.af.database.object('/images/'+image.$key);
      item.update({'likes':likes});
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
