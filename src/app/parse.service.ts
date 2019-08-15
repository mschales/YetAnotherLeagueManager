import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

declare const Parse: any;

@Injectable({
    providedIn: 'root'
})
export class ParseService {

    constructor() {
        Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
        Parse.serverURL = environment.serverURL;
    }

    getParse() {
        return Parse;
    }
}
