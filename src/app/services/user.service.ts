import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IUser, User} from '../models/user';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public createUser({username, name, lastname, email, password}: IUser): Observable<number> {
    return this.http.post<User>(`${environment.apiEndpoint}/users`, {username, password, name, lastname, email}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer newtoken`,
      })
    }).pipe(map(user => {
      return user.id;
    }));
  }

  public getUserDetails(id): Observable<User> {
    return this.http.get<User>(`${environment.apiEndpoint}/users/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer newtoken`,
      })
    });
  }
}
