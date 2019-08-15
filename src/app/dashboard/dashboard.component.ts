import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, ActivatedRoute } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  template: '<app-content> </app-content> <app-navigation></app-navigation>',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  

}
