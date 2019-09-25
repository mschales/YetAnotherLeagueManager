import { Component, OnInit } from '@angular/core';
import {ParseService} from '../parse.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.css']
})

export class TeamComponent {
  email = '';
  password = '';
  rememberMe = false;
  parse: any;

  constructor(parseService: ParseService) {
    this.parse = parseService.getParse();
  }

  handleSubmit = () => {
    const newUser = new this.parse;
    newUser.set('username', this.email);
    newUser.set('email', this.email);
    newUser.set('password', this.password);
    newUser.set('rememberMe', this.rememberMe);
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
