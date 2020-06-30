import * as Faker from 'faker';
export interface IUser {
  username: string;
  name: string;
  email: string;
  lastname: string;
  password: string;
  token?: string;
}


export class User implements IUser {
  id: number;
  username: string;
  name: string;
  email: string;
  lastname: string;
  password: string;
  token?: string;

  constructor({username, name, lastname, email, password}) {
    this.id = Faker.random.number();
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.password = password;
  }

  getId() {
    return this.id;
  }

  get fullName() {
    return `${this.name} ${this.lastname}`;
  }
}
