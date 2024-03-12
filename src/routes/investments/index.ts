import { Router } from 'express'

export const InvestmentsRouter = Router()

InvestmentsRouter.get('/', (_req, res) => res.send('Hello World!'))
