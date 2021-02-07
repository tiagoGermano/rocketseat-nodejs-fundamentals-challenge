import Transaction from '../models/Transaction';

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let totalIncome = 0;
    let totalOutcome = 0;

    for (let i = 0; i < this.transactions.length; i += 1) {
      if (this.transactions[i].type === 'income') {
        totalIncome += this.transactions[i].value;
      } else {
        totalOutcome += this.transactions[i].value;
      }
    }

    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
