import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateRequest {
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
    const income = this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === 'income') {
        return accumulator + transaction.value;
      }
      return accumulator;
    }, 0);

    const outcome = this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === 'outcome') {
        return accumulator + transaction.value;
      }
      return accumulator;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ value, title, type }: CreateRequest): Transaction {
    const transaction = new Transaction({ value, title, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
