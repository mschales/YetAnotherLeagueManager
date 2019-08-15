import {Component, OnInit} from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {ParseService} from '../parse.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {
  parse: any;

  constructor(private _router: Router, parseService: ParseService) {
    this.parse = parseService.getParse();
  }

  logOutUser = () => {
    this.parse.User.logOut();
    this._router.navigate((['']));
  }

  ngOnInit() {
    this.logOutUser();
  }
}
