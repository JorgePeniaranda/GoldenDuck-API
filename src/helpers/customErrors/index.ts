const createErrorFactory = function (name: string): any {
  return class CustomizedError extends Error {
    constructor (message: string) {
      super(message)
      this.name = name
    }
  }
}

export const ConfigError = createErrorFactory('ConfigError')
export const ValidationError = createErrorFactory('ValidationError')
export const NotFoundError = createErrorFactory('NotFoundError')
export const AuthorizationError = createErrorFactory('AuthorizationError')
export const ConflictError = createErrorFactory('ConflictError')
export const EmailError = createErrorFactory('EmailError')
export const RequestError = createErrorFactory('RequestError')
