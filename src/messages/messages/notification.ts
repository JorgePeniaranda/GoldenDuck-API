export const NotificationMessages = {
  NewTransactionReceived: (id: number) => `New transaction received from ${id}`,
  TransactionSent: (id: number) => `Transaction sent to ${id}`,
  UserActivated: 'User activated',
  UserPasswordUpdated: 'User password updated',
  UserDeleted: 'User deleted',
  CreateAccount: 'Account created',
  AccountBalanceIncremented: (index: number) => `Account ${index} balance incremented`,
  AccountBalanceDecremented: (index: number) => `Account ${index} balance decremented`,
  TransactionReceivedRejected: (id: number) => `Rransaction from ${id} was rejected`,
  TransactionSentRejected: (id: number) => `Transaction to ${id} was rejected`,
  NewMessageReceived: (id: number) => `New message received from ${id}`,
  NewSession: 'New session was registered',
  LoanCreated: 'Loan created',
  LoanCancelled: 'Loan cancelled',
  InvestmentCreated: 'Investment created',
  InvestmentCancelled: 'Investment cancelled'
}
