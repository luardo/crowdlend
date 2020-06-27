import * as Factory from 'factory.ts';
import * as Faker from 'faker';
import {ILocation, Project} from '../models/project';

const locationMockFactory = Factory.Sync.makeFactory<ILocation>({
  country: Faker.address.country(),
  zipCode: Faker.address.zipCode(),
  city: Faker.address.city(),
  address: Faker.address.streetAddress(true)
});
export  const projectMockFactory = Factory.Sync.makeFactory<Project>({
  id:  Factory.each( () => Faker.random.number()),
  thumbnail: Factory.each( () => Faker.image.image()),
  name: Factory.each( () => Faker.random.words(3)),
  location: locationMockFactory.build(),
  amount: Factory.each( () => Faker.finance.amount()),
  currency: Faker.finance.currencyCode()
})
