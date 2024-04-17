export const PrismaAmounts = {
  ACCOUNT_PER_USER: 3,
  ACTIVITY_PER_USER: 10,
  CARD_PER_ACCOUNT: 2,
  CATEGORY_AMOUNT: 100,
  ERROR_AMOUNT: 100,
  INVESTMENT_PER_ACCOUNT: 10,
  LOAN_PER_ACCOUNT: 10,
  MESSAGE_PER_USER: 50,
  NOTIFICATION_PER_USER: 50,
  SESSION_PER_USER: 10,
  TRANSACTION_PER_ACCOUNT: 20,
  USER_AMOUNT: 20
} as const

export const PrismaParams = {
  DELETED_PROBABILITY: 0.1,
  MAX_BALANCE: 1000000,
  MAX_INVESTMENT_AMOUNT: 10000,
  MAX_INVESTMENT_INTEREST: 0.01,
  MAX_LOAN_AMOUNT: 10000,
  MAX_LOAN_INTEREST: 0.01,
  MAX_TRANSACTION_AMOUNT: 10000,
  MESSAGE_READ_PROBABILITY: 0.5,
  MIN_BALANCE: 0,
  MIN_INVESTMENT_AMOUNT: 1,
  MIN_INVESTMENT_INTEREST: 0.01,
  MIN_LOAN_AMOUNT: 1,
  MIN_LOAN_INTEREST: 0.01,
  MIN_TRANSACTION_AMOUNT: 1,
  SESSION_ACTIVE_PROBABILITY: 0.3,
  USER_ACTIVE_PROBABILITY: 0.5,
  USER_DELETED_PROBABILITY: 0.1,
  USER_DEFAULT_PASSWORD: '¿¡TEST123test!?',
  USER_DNI_MAX: 99999999,
  USER_DNI_MIN: 10000000,
  USER_PHONE_MAX: 999999999,
  USER_PHONE_MIN: 100000000
} as const

export type PrismaWithoutID<T> = Omit<T, 'id'>
