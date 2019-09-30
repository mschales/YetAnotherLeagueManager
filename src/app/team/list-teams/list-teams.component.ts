import { Component, OnInit } from '@angular/core';
import { ParseService } from '../../parse.service';
import { TeamList } from '../teams';
import { Team } from '../team';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { create } from 'domain';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['../team.css']
})

export class ListTeamsComponent implements OnInit {

  parse: any;
  TeamList: any = TeamList;

  constructor(parseService: ParseService) {
    this.parse = parseService.getParse();
  }

  getTeams = () => {
    const newTeam = this.parse.Object.extend("teams");
    const query = new this.parse.Query(newTeam);
    const getResults = () => {
      query.find().then(res => {
        res.forEach((item) => {
          TeamList.push({
            id: item.id,
            name: item.get("name")
          })
        })
      })
    }
    getResults();    
  }

  
  resetForm = () => {

  }

  ngOnInit() {
    this.getTeams();
  }

}
