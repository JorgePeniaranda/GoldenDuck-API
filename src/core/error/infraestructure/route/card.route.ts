import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { ErrorUseCase } from '../../application/cardUseCase'
import { ErrorController } from '../controller/card.controller'

export const CardRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new ErrorUseCase(Repository)
const Controller = new ErrorController(UseCase)

CardRouter.get('/', Controller.getAllError)
CardRouter.post('/', Controller.createError)

CardRouter.get('/:id', Controller.findError)
CardRouter.delete('/:id', Controller.deleteError)
