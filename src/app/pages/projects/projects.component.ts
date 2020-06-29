import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Project} from '../../models/project';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
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
