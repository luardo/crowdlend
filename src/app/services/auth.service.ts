import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User>;
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('isLoggedIn'));
  }


  public get loggedUser(): User {
    if (!this.isLoggedIn) {
      return null;
    }
    this.user.next(JSON.parse(localStorage.getItem('user')));

    return this.user.value;
  }

  public get isLoggedIn(): boolean {
    const token = localStorage.getItem('isLoggedIn');

    this.isLoggedInSubject.next(!!token);

    if (!this.isLoggedInSubject.value) {
      return false;
    }

    return !!this.isLoggedInSubject.value;
  }

  public login(username: string, password: string) {
    return this.http.post(`${environment.apiEndpoint}/users/login`, {
      username, password
    });

  }
}
