import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthService as AuthGuard  } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { NavigationComponent } from './dashboard/navigation/navigation.component';
import { ContentComponent } from './dashboard/content/content.component';
import { TeamComponent } from './team/team.component';
import { TeamAddComponent } from './team/add/teamAdd';
import { ListTeamsComponent } from './team/list-teams/list-teams.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },

  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'team', pathMatch: 'full', component: TeamComponent, canActivate: [AuthGuard]},
  { path: 'team/add', component: TeamAddComponent, canActivate: [AuthGuard]},
  { path: 'team/list', component: ListTeamsComponent, canActivate: [AuthGuard]},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    HomeComponent,
    LogoutComponent,
    NavigationComponent,
    ContentComponent,
    TeamComponent,
    TeamAddComponent,
    ListTeamsComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: []
})


export class AppModule {
}
