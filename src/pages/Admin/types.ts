export type TransactionReport = {
  startDate: string;
  endDate: string;
  period: string;
  numberOfTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  income?: number;
  potentialIncome?: number;
};
