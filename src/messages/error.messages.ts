export const ErrorMessages = {
  AlreadyExist: 'User already exist',
  Conflict: (name: string) => `${name} already exists`,
  DatabaseConnectionError: 'Database connection error',
  EnvironmentVariableError: (variable: string): string =>
    `Environment variable "${variable}" not found`,
  InsufficientBalance: 'Saldo insuficiente',
  InsufficientFunds: 'Insufficient funds',
  Invalid: (name: string) => `${name} inválido`,
  InvalidPortValue: 'Invalid port value',
  NoCategory: 'Transaction does not have a category',
  NoVariableEnv: (variable: string): string =>
    `No se ha encontrado la variable de entorno "${variable}"`,
  NotFound: (name: string) => `${name} no encontrado`,
  NotOwner: 'You are not the owner of the account',
  PasswordNotMatch: 'Password not match',
  SameAccount: 'You cannot transfer money to the same account'
} as const
