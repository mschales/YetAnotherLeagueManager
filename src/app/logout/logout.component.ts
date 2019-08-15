import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

declare const Parse: any;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent  {

  constructor(private _router: Router) {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

  logOutUser = () => {
    Parse.User.logOut();
    this._router.navigate((['']));
  }

  ngOnInit() {
    this.logOutUser();
  }
}
