import { Router } from 'express'

export const UserRouter = Router()

UserRouter.get('/', (_req, res) => res.send('Hello World!'))
