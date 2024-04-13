export const EventsMap = {
  USER_CREATED: 'user.created',
  USER_ACTIVATED: 'user.activated',
  USER_PASSWORD_UPDATED: 'user.password-updated',
  USER_DELETED: 'user.deleted',
  CREATE_ACCOUNT: 'create.account',
  ACCOUNT_CREATED: 'account.created',
  ACCOUNT_INCREMENT_BALANCE: 'account.increment-balance',
  ACCOUNT_DECREMENT_BALANCE: 'account.decrement-balance',
  ACCOUNT_DELETED: 'account.deleted',
  CREATE_NOTIFICATION: 'create.notification',
  TRANSACTION_CREATED: 'transaction.created',
  TRANSACTION_REVERTED: 'transaction.reverted',
  MESSAGE_CREATED: 'message.created',
  CREATE_SESSION: 'create.session',
  SESSION_CREATED: 'session.created',
  LOAN_CREATED: 'loan.created',
  LOAN_CANCELLED: 'loan.cancelled',
  INVESTMENT_CREATED: 'investment.created',
  INVESTMENT_CANCELLED: 'investment.cancelled',
  USER_LOGGED_IN: 'user.logged-in', // solo manejada por session service
  NOTIFICATION_CREATED: 'notification.created',
  NOTIFICATION_READED: 'notification.readed'
} as const
