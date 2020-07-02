import * as Faker from 'faker';

export interface IInvestment {
  userId: number;
  projectId: number;
  amountInvested: number;
}

export class Investment implements IInvestment {

  id: number;
  userId: number;
  projectId: number;
  amountInvested: number;

  transactionId: number;
  orderId: number;

  constructor(userId, projectId, amountInvested) {
    this.userId = userId;
    this.projectId = projectId;
    this.amountInvested = amountInvested;
  }

  createInvestmentId() {
    this.id = Faker.random.number();
  }
}
