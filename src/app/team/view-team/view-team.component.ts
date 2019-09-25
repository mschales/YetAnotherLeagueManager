import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['../team.css']
})
export class ViewTeamComponent implements OnInit {

  id: string;
  private sub: any; 

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      this.id = params['id']; 
  });  
  }

}
