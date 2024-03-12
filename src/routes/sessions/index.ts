import { Router } from 'express'

export const SessionsRouter = Router()

SessionsRouter.get('/', (_req, res) => res.send('Hello World!'))
