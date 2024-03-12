import { Router } from 'express'

export const TransactionsRouter = Router()

TransactionsRouter.get('/', (_req, res) => res.send('Hello World!'))
