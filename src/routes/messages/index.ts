import { Router } from 'express'

export const MessagesRouter = Router()

MessagesRouter.get('/', (_req, res) => res.send('Hello World!'))
