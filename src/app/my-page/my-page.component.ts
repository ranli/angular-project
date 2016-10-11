import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable,AuthMethods,AuthProviders} from 'angularfire2';
import { Router} from '@angular/router';
@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})

export class MyPageComponent implements OnInit {

  images: FirebaseListObservable<any[]>;

  constructor(public af:AngularFire, public router:Router){
      this.af.auth.subscribe(auth => {
        if(!auth){
          this.router.navigateByUrl('/login');
        }else{
          this.images = af.database.list('/images',{
            query: {
              orderByChild: "authorId",
              equalTo: auth.uid
            }
          });
        } 
      });
  		
  }

  ngOnInit() {
  }

}
