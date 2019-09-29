import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from '../../parse.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['../team.css']
})

export class ViewTeamComponent implements OnInit {

  parse: any;
  teamName: string;
  authLevel: number;
  id: string;

  constructor(private route: ActivatedRoute, parseService: ParseService) {
    this.parse = parseService.getParse();
  }

  getUser = () => {
    const user = this.parse.User.current();
    const userData = this.parse.Object.extend("User")
    const query = new this.parse.Query(userData);
    return query.get(user.id).then(
      (user) => {
        this.authLevel = user.get("role");
      }
    );
  }

  getTeam = () => {
    const parseTeam = this.parse.Object.extend("teams");
    let query = new this.parse.Query(parseTeam);
    query.get(this.id)
      .then((item) => {
        this.teamName = item.get("name");
      })
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getUser();
    this.getTeam();
  }
}
