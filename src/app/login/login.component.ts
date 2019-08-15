import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, ActivatedRoute } from '@angular/router';

declare const Parse: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {

  email = '';
  password = '';

  constructor(private _router: Router) {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

  handleSubmit = () => {
    const parseUser = new Parse.User();
    parseUser.set("username", this.email);
    parseUser.set("email", this.email);
    parseUser.set("password", this.password);
    this.checkUser(this._router, parseUser);
  }

  handleUsernameChange = (event: KeyboardEvent) => {
    this.email = (<HTMLInputElement>event.target).value;
  };

  handlePasswordChange = (event: KeyboardEvent) => {
    this.password = (<HTMLInputElement>event.target).value;
  };

  checkUser = (router, user) => {
    user.logIn(this.email, this.password).then(function () {
      router.navigate(['dashboard']);
    }).catch(function (error) {
      console.log("Error: " + error.code + " " + error.message);
    });
  }

  ngOnInit() {
  }


}
