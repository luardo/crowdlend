export interface ILocation {
  city: string;
  country: string;
  address: string;
  zipCode: string;
}

export class Project {
  id: number;
  name: string;
  location: ILocation;
  thumbnail: string;
  amount: string;
  currency: string;
}
