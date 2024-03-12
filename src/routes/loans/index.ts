import { Router } from 'express'

export const LoansRouter = Router()

LoansRouter.get('/', (_req, res) => res.send('Hello World!'))
