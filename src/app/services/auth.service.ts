import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { parse } from 'url';
import { Observable } from 'rxjs/internal/Observable';
import {ParseService} from '../parse.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  parse: any;

  constructor(private _authService: AuthService, private _router: Router, parseService: ParseService) {
    this.parse = parseService.getParse();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.parse.User.current()) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
