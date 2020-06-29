import * as Factory from 'factory.ts';
import * as Faker from 'faker';
import {ILocation, IProject, Project} from '../models/project';

const locationMockFactory = Factory.Sync.makeFactory<ILocation>({
  country: Factory.each( () => Faker.address.country()),
  zipCode: Faker.address.zipCode(),
  city: Factory.each( () => Faker.address.city()),
  address: Faker.address.streetAddress(true)
});
export  const projectMockFactory = Factory.Sync.makeFactory<IProject>({
  id:  Factory.each( () => Faker.random.number()),
  thumbnail: Factory.each( () => Faker.image.image()),
  name: Factory.each( () => Faker.commerce.productName()),
  location: Factory.each( () => locationMockFactory.build()),
  amount: Factory.each( () => Faker.random.number({min: 20000, max: 990000})),
  amountRequired: Factory.each( () => Faker.random.number({min: 1000000})),
  description: Factory.each( () => Faker.lorem.paragraphs()),
  currency: Faker.finance.currencyCode()
})
