import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ParseService } from '../parse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  parse: any;
  user: any;

  constructor(authService: AuthService, router: Router, parseService: ParseService) {
    if (authService.canActivate) {
      this.parse = parseService.getParse();
      this.user = this.parse.User.current();
      if (this.user !== null) {
        router.navigate(['dashboard']);
      }
  }
}

  ngOnInit() {
  }
}
