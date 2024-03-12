import { Router } from 'express'

export const CardsRouter = Router()

CardsRouter.get('/', (_req, res) => res.send('Hello World!'))
