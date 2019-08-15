import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const Parse: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

  getUser = new Parse.User.current()
  user = this.getUser;

  ngOnInit() {
  }

}
