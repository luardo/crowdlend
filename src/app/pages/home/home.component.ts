import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public promotedProjects: Project[];

  private subscriptions: Subscription = new Subscription();

  constructor(private projectsService: ProjectsService) {

  }

  ngOnInit() {
    this.subscriptions.add(
      this.subscribePromotedProjects()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private subscribePromotedProjects(): Subscription {
    return this.projectsService.getProjects().pipe(
      map(projects => projects.slice(0, 5)),
    ).subscribe(projects => {
      this.promotedProjects = projects;
    });
  }

}
