import { Router } from 'express'

export const ErrorsRouter = Router()

ErrorsRouter.get('/', (_req, res) => res.send('Hello World!'))
