import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable,AuthMethods,AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: any;
  images: FirebaseListObservable<any[]>;
  user:any;
  close: boolean;
  constructor(public af: AngularFire){
      this.images = af.database.list('/images');
      this.af.auth.subscribe(user => {this.user = user});
  		this.title = "";
      this.close = true;
  }

  logout(){
    this.af.auth.logout();
    alert("You have been Logged out!");
  }

  closeWindow(){
    this.close = true;
  }

  showWindow(){
    this.close = false;
  }

  addToList(item: any) {
    this.images.push(item);
  }

  upload(){
    if(this.user == null){
      alert("Please Login !!!");
    }
  	var self = this;
  	var file = <HTMLInputElement>document.getElementById("image");
    var imageName = self.user.uid + '-' + file.files[0].name;
  	var storageRef = firebase.storage().ref().child('images/'+ imageName);

  	var metadata = {
  		customMetadata: {
  			'author': self.user.auth.displayName, 
        'authorId': self.user.uid,
  			'likes': '0',
        'authorPhoto': self.user.auth.photoURL,
  			'title': self.title
  		}
  	};
 
  	storageRef.put(file.files[0], metadata).then(function(snapshot) {
  		var data = snapshot.metadata;
  		var item = {
  			"author": data.customMetadata["author"], 
        "authorPhoto": data.customMetadata["authorPhoto"],
        "authorId": data.customMetadata["authorId"],
  			"likes": data.customMetadata["likes"], 
  			"title":data.customMetadata["title"], 
  			"name": data.name,
  			"time":data.timeCreated,
  			"contentType":data.contentType,
  			"url":data.downloadURLs[0]
  		};
  		self.addToList(item);
  		if(snapshot.state == "success"){
  			self.title = "";
  			file.value= "";
  			alert('upload success');
  		}
	}).catch(err => console.log(err));

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
