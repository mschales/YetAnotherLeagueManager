import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, Route } from '@angular/router';

declare const Parse: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private _router: Router) {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

  handleSubmit = () => {
    const user = new Parse.User();
    user.set("username", this.email);
    user.set("email", this.email);
    user.set("password", this.password);

    user.logIn(user.username, user.password).then(function (user) {
    }).catch(function (error) {
      console.log("Error: " + error.code + " " + error.message);
    });
  };

  handleUsernameChange = (event: KeyboardEvent) => {
    this.email = (<HTMLInputElement>event.target).value;
  };

  handlePasswordChange = (event: KeyboardEvent) => {
    this.password = (<HTMLInputElement>event.target).value;
  };

  ngOnInit() {
  }

  
}
