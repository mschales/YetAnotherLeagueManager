import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {ParseService} from '../parse.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  parse: any;
  email = '';
  password = '';

  constructor(private _router: Router, parseService: ParseService) {
    this.parse = parseService.getParse();
  }

  handleSubmit = () => {
    const parseUser = new this.parse.User();
    parseUser.set('username', this.email);
    parseUser.set('email', this.email);
    parseUser.set('password', this.password);
    this.checkUser(this._router, parseUser);
  }

  handleUsernameChange = (event: KeyboardEvent) => {
    this.email = (<HTMLInputElement>event.target).value;
  }

  handlePasswordChange = (event: KeyboardEvent) => {
    this.password = (<HTMLInputElement>event.target).value;
  }

  checkUser = (router, user) => {
    user.logIn(this.email, this.password).then(function () {
      router.navigate(['dashboard']);
    }).catch(function (error) {
      console.log('Error: ' + error.code + ' ' + error.message);
    });
  }

  ngOnInit() {
  }

}
