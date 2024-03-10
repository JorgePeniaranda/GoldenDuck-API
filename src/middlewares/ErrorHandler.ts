import { type Request, type Response, type NextFunction } from 'express'

export default function ErrorHandler (err: any, _req: Request, res: Response, _next: NextFunction): Response {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message })
  }
  return res.status(500).json({ error: 'Internal Server Error' })
}
