import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {

  public project: Project;

  public projectId: string;
  public canInvest = false;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        this.projectId = id;
        return this.projectsService.getProjectById(id);
      }),
      tap(response => {
        this.project = new Project(response);
      }),
      switchMap(response => {
        return this.projectsService.getProjectAvailability(response.id.toString());
      })
    ).subscribe(({canInvest}) => {
      this.canInvest = canInvest;
      }
    );
  }
}
