import { Router } from 'express'

export const CategoriesRouter = Router()

CategoriesRouter.get('/', (_req, res) => res.send('Hello World!'))
