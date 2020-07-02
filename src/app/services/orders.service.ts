import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {User} from '../models/user';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient,  private authService: AuthService) {
  }

  public createOrder(projectId: string, amount: number): Observable<number> {
    const {id}: User = this.authService.loggedUser;

    return this.http.post<number>(`${environment.apiEndpoint}/orders`, {userId: id, projectId, amount}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer newtoken`,
      })
    });
  }

  public getOrderById(id): Observable<Order> {
    return this.http.get<Order>(`${environment.apiEndpoint}/orders/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer newtoken`,
      })
    });
  }
}
