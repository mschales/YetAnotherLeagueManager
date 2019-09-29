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
  playerList: any;
  firstname: string;
  surname: string;
  jersey: number;
  position: string;
  teamid: number;
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

  getPlayerList = () => {
    const newTeam = this.parse.Object.extend("Players");
    const query = new this.parse.Query(newTeam);
    const tempList = [];
    const getPlayers = () => {
      query.find().then(res => {
        res.forEach((item) => {
          tempList.push({
            firstname: item.get("firstname"),
            surname: item.get('surname'),
            position: item.get('position'),
            jersey: item.get('jersey'),
          })
        })
      })
      return tempList;
    }
    this.playerList = getPlayers();
  }

  updateFirstName = (event: KeyboardEvent) => {
    this.firstname = (<HTMLInputElement>event.target).value;
  }

  updateSurname = (event: KeyboardEvent) => {
    this.surname = (<HTMLInputElement>event.target).value;
  }

  updatePosition = () => {
    this.position = (<HTMLInputElement>event.target).value;
  }

  updateJersey = () => {
    this.jersey = parseInt((<HTMLInputElement>event.target).value);
  }

  addPlayerSubmit = () => {
    const playerObject = this.parse.Object.extend('Players');
    const addPlayer = new playerObject();
    addPlayer.set('firstname', this.firstname);
    addPlayer.set('surname', this.surname);
    addPlayer.set('position', this.position);
    addPlayer.set('teamid', this.id);
    addPlayer.save().then((player) => {
      alert('Added player to team')
    }, (error) => { console.log(error.message) }
    )
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getUser();
    this.getTeam();
    this.getPlayerList();
    console.log(this.playerList);
  }
}

