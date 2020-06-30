import * as Faker from 'faker';

export interface IInvestment {
  userId: number;
  projectId: number;
  amountInvested: number;
}

export class Investment implements IInvestment {

  userId: number;
  projectId: number;
  amountInvested: number;

  constructor(userId, projectId, amountInvested) {
    this.userId = userId;
    this.projectId = projectId;
    this.amountInvested = amountInvested;
  }

  public getTransactionId(): number {
    return Faker.random.number();
  }

}
