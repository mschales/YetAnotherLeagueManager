import { Component } from '@angular/core';
import {ParseService} from '../parse.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  email = '';
  password = '';
  rememberMe = false;
  parse: any;

  constructor(parseService: ParseService) {
    this.parse = parseService.getParse();
  }

  handleSubmit = () => {
    const newUser = new this.parse.User();
    newUser.set('username', this.email);
    newUser.set('email', this.email);
    newUser.set('password', this.password);
    newUser.set('rememberMe', this.rememberMe);

    newUser.signUp(null).then(
      function (user) {
        alert('User created successfully with email: ' + user.get('email'));
      },

      function (error) {
        alert('Error ' + error.code + ': ' + error.message);
      }
    );
  }

  handleUsernameChange = (event: KeyboardEvent) => {
    this.email = (<HTMLInputElement>event.target).value;
  }

  handlePasswordChange = (event: KeyboardEvent) => {
    this.password = (<HTMLInputElement>event.target).value;
  }

  handleRememberMeClick = () => {
    this.rememberMe = !this.rememberMe;
  }
}

