import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../models/user';
import {Investment} from '../models/investment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public createOrder(projectId: string, amount: number): Observable<number> {
    const {id}: User = this.authService.loggedUser;

    return this.http.post<number>(`${environment.apiEndpoint}/investments`, {userId: id, projectId, amount}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer newtoken`,
      })
    });
  }

  public getInvestments(): Observable<Investment[]> {
    const {id}: User = this.authService.loggedUser;

    if (!id) {
      return null;
    }

    return this.http.get<Investment[]>(`${environment.apiEndpoint}/investments/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer newtoken`,
      })
    });
  }
}
