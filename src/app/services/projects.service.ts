import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../models/project';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.apiEndpoint}/projects`);
  }

  public getProjectById(id: string) {
    return this.http.get<Project>(`${environment.apiEndpoint}/projects/${id}`);
  }

  public getProjectAvailability(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiEndpoint}/projects/canInvest/${id}`);
  }
}
