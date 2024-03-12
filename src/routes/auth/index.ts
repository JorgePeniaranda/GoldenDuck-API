import { Router } from 'express'

export const AuthRouter = Router()

AuthRouter.get('/', (_req, res) => res.send('Hello World!'))
