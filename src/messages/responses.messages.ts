export const ResponseMessages = {
  AccountBalanceDecremented: (index: number) => `Account ${index} balance decremented`,
  AccountBalanceIncremented: (index: number) => `Account ${index} balance incremented`,
  CreateAccount: 'Account created',
  InvestmentCancelled: 'Investment cancelled',
  InvestmentCreated: 'Investment created',
  LoanCancelled: 'Loan cancelled',
  LoanCreated: 'Loan created',
  NewMessageReceived: (id: number) => `New message received from ${id}`,
  NewSession: 'New session was registered',
  NewTransactionReceived: (id: number) => `New transaction received from ${id}`,
  TransactionReceivedRejected: (id: number) => `Rransaction from ${id} was rejected`,
  TransactionSent: (id: number) => `Transaction sent to ${id}`,
  TransactionSentRejected: (id: number) => `Transaction to ${id} was rejected`,
  UserActivated: 'User activated',
  UserDeleted: 'User deleted',
  UserPasswordUpdated: 'User password updated'
} as const
