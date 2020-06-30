import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {projectsFromFakeDataBase} from '../mockdata/project.mock';
import {delay} from 'rxjs/operators';
import {User} from '../models/user';
import {IInvestment, Investment} from '../models/investment';

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

        return addNewInvestment();

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

    function addNewInvestment() {
      const investment: Investment = new Investment(body.userId, body.projectId, body.amount);

      const investments = getInvestments();
      const newInvestment = {
        userId: investment.userId, // ToDo here so set the user id
        projectId: Number(body.projectId),
        amount: body.amount
      };

      if (investments) {
        localStorage.setItem('investments', JSON.stringify([newInvestment, ...investments]));
      } else {
        localStorage.setItem('investments', JSON.stringify([newInvestment]));
      }

      return response(investment.getTransactionId());
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
