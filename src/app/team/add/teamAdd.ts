import {Component, OnInit} from '@angular/core';
import {ParseService} from '../../parse.service';

@Component({
    selector: 'app-team-add',
    templateUrl: './TeamAdd.component.html',
    styleUrls: ['../team.component.css']
})

export class TeamAddComponent {
    name = '';
    manager = '';
    league = '';
    parse: any;

    constructor(parseService: ParseService) {
        this.parse = parseService.getParse();
    }

    findTeam = () => {
        const newTeam = this.parse.Object.extend('teams');
        const createTeam = new newTeam();

        createTeam.get('J5zbG3DUrl').then(
            (team) => {
                console.log('team found ' + team);
            },
            (error) => {
                console.error(error);
            });
    }

    handleSubmit = () => {
        const newTeam = this.parse.Object.extend('teams');
        const createTeam = new newTeam();
        this.findTeam();

        // createTeam.set('name', this.name);
        // createTeam.set('email', this.manager);
        // createTeam.set('password', this.league);

        // createTeam.save().then( (team) => { alert('created new team') },  (error) => { console.log(error.message) } )
    }
    //
    // handleNameChange = (event: KeyboardEvent) => {
    //     this.name = (<HTMLInputElement>event.target).value;
    // }
    //
    // handleManagerChange = (event: KeyboardEvent) => {
    //     this.manager = (<HTMLInputElement>event.target).value;
    // }
}

