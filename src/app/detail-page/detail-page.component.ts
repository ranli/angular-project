import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  images: FirebaseListObservable<any[]>;
  constructor(private route: ActivatedRoute, public af:AngularFire) { 
      	this.route.params.forEach((params: Params) => {
      		let id = params['uid'];
      		this.images = af.database.list('/images',{
  				query: {
  					orderByChild: "authorId",
  					equalTo: id
  				}
  			});
    	});
  		
  }
  ngOnInit(): void {
    
  }
  updateLikes(image){
      var likes = Number(image.likes) + 1;
      var item = this.af.database.object('/images/'+image.$key);
      item.update({'likes':likes});
  }
 
}
