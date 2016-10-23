import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthMethods, AuthProviders } from 'angularfire2';

@Injectable()
export class ImageServiceService {

  constructor(public af:AngularFire) { }

  getUser(){

  	this.af.auth.subscribe(res => {var user = res; return user;});

  }

  getAllImages(){

  	return this.af.database.list('/images',{query: {orderByChild: 'likes'}});

  }

  getMyImages(uid){

  	return this.af.database.list('/images',{ query:{
  								orderByChild: "authorId",
              					equalTo: uid}});
  }

  updateLikes(image){

  	  var likes = Number(image.likes) + 1;
      var item = this.af.database.object('/images/'+image.$key);
      item.update({'likes':likes});

  }

  updateComments(image,comment,name){

  	  var newComment = {
  	  		'comment': comment,
  	  		'from': name
  	  };
  	  var item = this.af.database.list('/images/'+image.$key+ '/comments');
  	  item.push({'comment': newComment});
  	  
  }

  uploadImage(user, file, title, metadata){

    var imageName = user.uid + '-' + file.files[0].name;
  	var storageRef = firebase.storage().ref().child('images/'+ imageName);
 	var self = this;
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
  		self.af.database.list('/images').push(item);
  		if(snapshot.state == "success"){
    		alert('upload success');
  		}
	}).catch(err => console.log(err));
  }
}
