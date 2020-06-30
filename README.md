# Crowdlend

A stakeholder has an idea of creating a small crowd lending platform. You as an expert should help them to achieve this goal by creating a small crowd lending UI as POC/MVP for a stakeholder.

####  Features
- The project has a HTTP interceptor to simulate the backend.
- A user can register 
- A user can login after registration. There is a test account already user: test password: test
- A user can explore projects to invest only when logged in
- A user can invest only once per project bewteen 100 and 10.000 
- The invest form contains a slider to select the amount to invest. No input field in this case to test a different UX
- A user can see in the dashboard (link in the footer of the app) his data and invested projects


####  Notes:
- No tests have been written :(
- So data is hardcoded in the template, and other data has been randomly generated
- The view of the application is only optimized for mobile devices. Desktop view might show inconsistencies


#### Pending: (things I would have like to add with more time)
- More responsiveness in the layout
- Add interest rates in the fake backend 
- Add transitions and loading states
- Add auth bearer token in HTTP interceptor
- Currency validator. Currently everything is a mixture between Dollars and Euros. Should be consistent with the current locale 
- Add tests


#### Story:
- User comes to homepage, clicks on Create account
- User creates account and procceeds to log in
- Once logged in, user can explore projects
- User can click on single project to read details
- User can invest into project
- User can select amount to invest and submit
- User gets notification of success or failure
- User can explore new projects and invest, but cannot invest in the projects which has invested before
- USer can see the list of investments and personal data in My Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

#### Requirements
Develop a UI with various views as described below. You should use browser-based storage functionality for storing registration detail and the login should verify against this storage.
 
The UI should contain components/views for the following:
- Responsive & mobile first preferred UI design;
- A registration form, with fields for Name, Email, Password, Confirm Password:
- All fields required;
- Validation expected.
- A login form, which verifies against the registration data that is stored in the browser:
- All fields required;
- Validation expected;
- A list of projects (fundings) which can be invested in once a user has logged in. 

The data should be:
- JSON, retrieved via a REST API call;
- Structure should at least contain:
- Project Name, 
- Amount of investment required for the project
- Any other detail you feel might be relevant;
- Functionality for a user to invest an amount of 100€-10.000€, including validation;
- UI notification functionality that can inform the end user of useful messages based on actions taken in the UI;
- A view which shows all data stored for a given user, including registration details, projects invested in.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
