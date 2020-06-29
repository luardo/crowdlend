export class Investment {

  username: string;
  projectId: number;
  amountInvested: number;

  constructor(username, projectId, amountInvested) {
    this.username = username;
    this.projectId = projectId;
    this.amountInvested = amountInvested;
  }

  getTransactionId(): number {
    return 1;

  }

}
