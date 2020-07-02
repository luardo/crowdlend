import * as Faker from 'faker';

export interface ILocation {
  city: string;
  country: string;
  address: string;
  zipCode: string;
}

export interface IProject {
  id?: number;
  name: string;
  location: ILocation;
  thumbnail: string;
  amount: number;
  amountRequired: number;
  currency: string;
  description: string;
}

export class Project {
  id: number;
  name: string;
  location: ILocation;
  thumbnail: string;
  amount: number;
  amountRequired: number;
  currency: string;
  description: string;
  interestRate: number;

  constructor(project: IProject) {
    this.id = project.id;
    this.amount = project.amount;
    this.name = project.name;
    this.thumbnail = project.thumbnail;
    this.amountRequired = project.amountRequired;
    this.currency = 'EUR';
    this.location = project.location;
    this.description = project.description;


    this.calculateInterestRate();
  }

  get excerpt() {
    return this.description.split(' ').splice(0, 20).join(' ');
  }

  get cityAndCountry(): string {
    return `${this.location.city}, ${this.location.country}`;
  }

  get fundedPercent() {
    return this.amount / this.amountRequired * 100;
  }

  public increaseAmount(amount: number) {
    this.amount = this.amount + amount;
  }

  private calculateInterestRate() {
    this.interestRate = Faker.random.number({min: 1, max: 6, precision: 0.2});
  }
}
