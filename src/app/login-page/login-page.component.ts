import { Component, OnInit } from '@angular/core';
import { AngularFire,AuthMethods,AuthProviders } from 'angularfire2';
import { NgForm} from '@angular/forms';
import { Router} from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  user = {email:"",password:""};
  message: string;
  constructor(public af: AngularFire, public router: Router) { 
  		
  }

  ngOnInit() {
  }

  login(){
  	this.af.auth.login({
  		provider: AuthProviders.Twitter,
  		method: AuthMethods.Popup,
  	})
  	.then(success => {
  						this.router.navigateByUrl('/myimages')
            })
    .catch(err => console.log(err));
  }

  onSubmit(f: NgForm){
  	this.af.auth.login({
  						email:f.value.user.email,
  						password:f.value.user.password
  					},
  					{
  						provider: AuthProviders.Password,
  						method: AuthMethods.Password
  					})
  			.then(success => {
  					console.log(success);
  				})
  			.catch(error =>{
  				console.log(this.message = error.message);
  			});
  }

}
