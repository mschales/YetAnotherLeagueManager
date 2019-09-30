import {Component, OnInit} from '@angular/core';
import {ParseService} from '../../parse.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
    parse: any;
    user: any;

    constructor(parseService: ParseService) {
        this.parse = parseService.getParse();
        this.user = this.parse.User.current();
    }

    ngOnInit() {
        const userObject = this.parse.Object.extend("User");
        const getuser = new this.parse.Query(userObject);
        if (this.user===null) return;
        getuser.get(this.user.id).then((info) => {
            this.user.authLevel = info.get("role")
        });
    }
}
