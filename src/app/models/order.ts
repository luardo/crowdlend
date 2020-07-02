import {IInvestment} from './investment';
import * as Faker from 'faker';

export class Order implements IInvestment {

  amountInvested: number;
  projectId: number;
  userId: number;
  transactionId: number;
  id: number;
  completed = false;

  constructor(userId, projectId, amountInvested, id = null) {
    this.userId = userId;
    this.projectId = projectId;
    this.amountInvested = amountInvested;
    this.id = id || this.createOrderId();
  }

  public completeTransaction() {
    this.createTransactionId();
    this.completed = true;
  }

  private createOrderId() {
    return Faker.random.number();
  }

  private createTransactionId() {
    this.transactionId = Faker.random.number();
  }

}
