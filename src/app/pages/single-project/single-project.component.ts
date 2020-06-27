import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {

  public project: Project;

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {

    this.projectsService.getProjectById(1).subscribe(response => {


        console.log(response);
        this.project = response;
      }
    );
  }

}
