import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from '../../parse.service';
import { format } from 'url';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['../team.css']
})

@Injectable()
export class ViewTeamComponent implements OnInit {

  parse: any;
  playerList: any;
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

  constructor(private route: ActivatedRoute, parseService: ParseService) {
    this.parse = parseService.getParse();
    this.curUser = this.parse.User.current().id;
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
        if (item.get("manager") !== undefined) {
          this.manager = item.get("manager");
        }
      })
  };

  getPlayerList = () => {
    const newTeam = this.parse.Object.extend("Players");
    const query = new this.parse.Query(newTeam);
    const tempList = [];
    query.equalTo("teamid", this.id);
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

  getUserList = () => {
    const newTeam = this.parse.Object.extend("User");
    const query = new this.parse.Query(newTeam);
    const tempList = [];
    const getUsers = () => {
      query.find().then(res => {
        res.forEach((item) => {
          tempList.push({
            id: item.id,
            email: item.get("email"),
            name: item.get('email'),
            role: item.get('role')
          })
        })
      })
      return tempList;
    }
    this.userList = getUsers();
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
    addPlayer.save().then(() => {
      this.getPlayerList();
    }, (error) => { console.log(error.message) }
    )
  }

  updateManager  = () => {
    this.manager = (<HTMLInputElement>event.target).value;
    console.log(this.manager);
  }

  teamManagerForm = () => {
    console.log(this.manager);
    const parseTeam = this.parse.Object.extend("teams");
    let query = new this.parse.Query(parseTeam);
    query.get(this.id)
      .then((item) => {
        item.set("manager", this.manager);
        item.save();
      })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getUser();
    this.getTeam();
    this.getUserList();
    this.getPlayerList();
  }
}

