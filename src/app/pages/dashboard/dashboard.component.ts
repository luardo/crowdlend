import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {InvestmentService} from '../../services/investment.service';
import {Investment} from '../../models/investment';
import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$: Observable<User>;
  projects$: Observable<Project[]>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private investmentService: InvestmentService,
    private projectsServices: ProjectsService
  ) {
  }

  ngOnInit() {
    const {id} = this.authService.loggedUser;
    this.user$ = this.userService.getUserDetails(id).pipe(map(user => new User(user)));

    this.projects$ = this.investmentService.getInvestments().pipe(
      map((investments: Investment[]) => {
        return investments.map(investment => investment.projectId);
      }),
      switchMap((projectIds: number[]) =>
        forkJoin(projectIds.map( projectId => this.projectsServices.getProjectById(projectId.toString())))
      ),
    );
  }

}
