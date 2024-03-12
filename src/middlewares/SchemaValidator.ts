import { type NextFunction, type Request, type Response } from 'express'

export const ValidatorMiddleware = (_request: Request, response: Response, next: NextFunction): any => {
  try {
    // request.query = schema.parse(request.query)
    next()
  } catch (e) {
    return response.json(e)
  }
}
