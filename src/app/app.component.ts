import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable,AuthMethods,AuthProviders } from 'angularfire2';
import { ImageServiceService } from './image-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: any;
  user:any;
  close: boolean;
  constructor(public af: AngularFire, public imageService: ImageServiceService){
      this.af.auth.subscribe(user => {this.user = user});
  		this.title = "";
      this.close = true;
  }

  logout(){
    this.af.auth.logout();
    alert("You have been Logged out!");
  }

  closeWindow(){
    this.title = "";
    var preview = <HTMLInputElement>document.querySelector('.preview');
    preview.src = "";
    this.close = true;
  }

  showWindow(){
    var file = <HTMLInputElement>document.getElementById("image");
    if(file.value != ""){
      file.value = "";
    }
    this.close = false;
  }


  upload(){
    if(this.user == null){
      alert("Please Login !!!");
    }
  	var self = this;
  	var file = <HTMLInputElement>document.getElementById("image");
  	var metadata = {
  		customMetadata: {
  			'author': self.user.auth.displayName, 
        'authorId': self.user.uid,
  			'likes': '0',
        'authorPhoto': self.user.auth.photoURL,
  			'title': self.title,
        'comments': ''
  		}
  	};
    this.imageService.uploadImage(this.user,file,this.title,metadata);
  	this.closeWindow();
	

  }

  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
  	var preview = <HTMLInputElement>document.querySelector('.preview');
    var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();

    myReader.addEventListener("load", function () {
    				preview.src = myReader.result;
  			}, false);

    myReader.readAsDataURL(file);
  }

}
