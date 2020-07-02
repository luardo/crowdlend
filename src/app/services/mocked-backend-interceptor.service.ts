import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {projectsFromFakeDataBase} from '../mockdata/project.mock';
import {delay} from 'rxjs/operators';
import {User} from '../models/user';
import {IInvestment, Investment} from '../models/investment';
import {Order} from '../models/order';

const testUser: User = new User({
  username: 'test',
  name: 'luis',
  email: 'luis@gmail.com',
  lastname: 'rivera',
  password: 'test',
});

const projects = projectsFromFakeDataBase;

@Injectable()
export class MockedBackendInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const {url, method, headers, body} = request;

    switch (true) {
      case url.endsWith('/api/projects') && method === 'GET':

        return getAllProjects();

      case url.match(/\/projects\/\d+$/) && method === 'GET':

        return getProjectById();

      case url.match(/\/canInvest\/\d+$/) && method === 'GET':

        return canInvest();

      case url.endsWith('/api/investments') && method === 'POST':
        return addInvestment();

      case url.endsWith('/api/orders') && method === 'POST':
        return addOrder();

      case url.match(/\/orders\/\d+$/) && method === 'GET':
        // creates neew user
        return getOrderById();

      case url.match(/\/investments\/\d+$/) && method === 'GET':
        // creates neew user
        return getInvestmentsByUserId();

      case url.match(/\/users\/\d+$/) && method === 'GET':
        // creates neew user
        return getUserById();

      case url.endsWith('users') && method === 'POST':

        return addNewUser();

      case url.endsWith('users/login') && method === 'POST':

        return login();

      default:
        // pass through any requests not handled above
        return next.handle(request);
    }

    function response(data) {
      return of(new HttpResponse({status: 200, body: data})).pipe(delay(300));
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer newtoken';
    }

    function getIdParam() {
      const urlParts = url.split('/');
      return Number(urlParts[urlParts.length - 1]);
    }

    function getUserById() {

      if (isLoggedIn()) {
        const urlParts = url.split('/');
        const id = Number(urlParts[urlParts.length - 1]);
        const latestUser = JSON.parse(localStorage.getItem('user'));
        const allUsers: User[] = [testUser, latestUser];

        const user = allUsers.find(u => u.id === id);
        if (!user) {
          return throwError({error: {message: 'Username or password is incorrect'}});
        }

        return response(user);

      }
    }

    function getInvestmentsByUserId() {
      if (isLoggedIn()) {
        const urlParts = url.split('/');
        const id = Number(urlParts[urlParts.length - 1]);
        const investments: IInvestment[] = JSON.parse(localStorage.getItem('investments'));

        const investmentsFound = investments.filter(investment => investment.userId === id);

        return response(investmentsFound);

      }
    }

    function getOrderById() {
      const id = getIdParam();
      const order: Order = JSON.parse(localStorage.getItem('orders'));

      if (!order || order.id !== id) {
        return throwError({error: {message: 'No order exists'}});
      }

      return response(order);
    }

    function getProjectById() {
      const projectById = getProjectId();

      if (!projectById) {
        return throwError({error: {message: 'Project not found with the id given'}});
      }

      return response(projectById);
    }

    function getAllProjects() {
      return response(projects);
    }

    function getProjectId() {
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 1]);


      return projects.find(project => id === project.id);
    }

    function login() {
      const {username, password} = body;
      const latestUser = JSON.parse(localStorage.getItem('user'));
      const allUsers: User[] = [testUser, latestUser];

      const user = allUsers.find(fetchUser => fetchUser.username === username && fetchUser.password === password);
      if (!user) {
        return throwError({error: {message: 'Username or password is incorrect'}});
      }
      user.token = 'newtoken';
      localStorage.setItem('isLoggedIn', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      return response(user);
    }

    function addNewUser() {
      const user = new User(body);
      localStorage.setItem('user', JSON.stringify(user));
      // creates new user
      return response(user);
    }

    function getInvestments(): { username: string, projectId: number, amount: number }[] {
      const investments = JSON.parse(localStorage.getItem('investments'));
      return !!investments && investments;
    }

    function addInvestment() {

      const {orderId} = body;

      const orderFromLocalStorage: Order = JSON.parse(localStorage.getItem('orders'));

      if (!orderFromLocalStorage || orderFromLocalStorage.id !== orderId) {
        return throwError({error: {message: 'No order exists'}});
      }

      const order = new Order(orderFromLocalStorage.userId, orderFromLocalStorage.projectId, orderFromLocalStorage.amountInvested, orderFromLocalStorage.id);

      if (order.completed) {
        return throwError({error: {message: 'this order has been completed'}});
      }

      const investment: Investment = new Investment(order.userId, order.projectId, order.amountInvested);

      order.completeTransaction();

      investment.createInvestmentId();
      investment.transactionId = order.transactionId;
      investment.orderId = order.id;

      const savedInvestments = getInvestments();
      if (savedInvestments) {
        localStorage.setItem('investments', JSON.stringify([investment, ...savedInvestments]));
      } else {
        localStorage.setItem('investments', JSON.stringify([investment]));
      }

      localStorage.setItem('orders', JSON.stringify(order));

      return response(investment);
    }

    function addOrder() {
      const investmentOrder: Order = new Order(body.userId, body.projectId, body.amount);
      localStorage.setItem('orders', JSON.stringify(investmentOrder));
      return response(investmentOrder.id);
    }

    function canInvest() {
      if (!getProjectFromLocalStorage()) {
        return response({canInvest: true});
      }

      return response({canInvest: false});
    }

    function getProjectFromLocalStorage() {
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 1]);
      const investments = getInvestments();

      if (!investments) {
        return null;
      }

      return investments.find(investment => Number(investment.projectId) === id);
    }

  }

}
