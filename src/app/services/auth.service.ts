import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { parse } from 'url';
import { Observable } from 'rxjs/internal/Observable';

declare const Parse: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private _authService: AuthService, private _router: Router) {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (Parse.User.current()) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
