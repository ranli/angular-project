import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ImageServiceService} from '../image-service.service'
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  user:any;
  images: any;
  length:number;
  constructor(private route: ActivatedRoute, private imageService: ImageServiceService) { 
      	this.route.params.forEach((params: Params) => {
      		let id = params['uid'];
      		this.images = this.imageService.getMyImages(id);
    	});
        this.user = this.imageService.getUser();
        this.length = 3;
  		
  }
  ngOnInit(): void {
    
  }
  updateLikes(image){
      this.imageService.updateLikes(image);
  }
  addLength(){
    this.length += 3;
  }
  updateComments($event,image){
    this.imageService.updateComments(image,$event.target.value,this.user.auth.displayName);
  }
 
}
