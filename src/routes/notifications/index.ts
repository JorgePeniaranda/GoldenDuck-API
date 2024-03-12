import { Router } from 'express'

export const NotificationsRouter = Router()

NotificationsRouter.get('/', (_req, res) => res.send('Hello World!'))
