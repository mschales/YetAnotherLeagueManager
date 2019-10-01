import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from '../../parse.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['../admin.css']
})
export class MatchesComponent implements OnInit {

  parse: any;
  matchList: any;
  userList: any;
  firstname: string;
  surname: string;
  jersey: number;
  position: string;
  manager: any;
  curUser: any;
  teamid: number;
  teamName: string;
  authLevel: number;
  id: string;
  datePicker:any;

  constructor(private route: ActivatedRoute, parseService: ParseService) {
    this.parse = parseService.getParse();
    this.curUser = this.parse.User.current().id;
    this.datePicker = Date.now();
  }

  updateDate = () => {
    this.datePicker = (<HTMLInputElement>event.target).value;
    this.datePicker = (<HTMLInputElement>event.target).value;
    console.log(this.datePicker);
  }

  updateHomeTeam = () => {
    console.log(this.datePicker);
  }

  updateVisitorTeam = () => {
    console.log(this.datePicker);
  }

  getMatches = () => {
    const matchObject = this.parse.Object.extend("matches")
    const query = new this.parse.Query(matchObject);
    const tempList = [];
    const generateMatchList = () => {
      query.find().then(res => {
        res.forEach((match) => {
          const date = match.get("date");
          const formattedDate = ` ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} (${date.getHours()}:${date.getMinutes()})`;
          tempList.push({
            id: match.id,
            home: match.get("home"),
            visitor: match.get("visitor"),
            home_goals: match.get("home_goals"),
            visitor_goals: match.get("visitor_goals"),
            date: formattedDate
          })
        })
      })
      return tempList;
    }
    this.matchList = generateMatchList();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getMatches();
  }
}