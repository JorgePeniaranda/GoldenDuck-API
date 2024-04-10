export const ErrorsMessages = {
  DatabaseConnectionError: 'Database connection error',
  InsufficientBalance: 'Saldo insuficiente',
  EnvironmentVariableError: (variable: string): string =>
    `Environment variable "${variable}" not found`,
  InvalidPortValue: 'Invalid port value',
  Invalid: (name: string) => `${name}: inválido`,
  NotFound: (name: string) => `${name}: no encontrado`,
  NoVariableEnv: (variable: string): string =>
    `No se ha encontrado la variable de entorno "${variable}"`
}
