import { Router } from 'express'

export const AccountsRouter = Router()

AccountsRouter.get('/', (_req, res) => res.send('Hello World!'))
