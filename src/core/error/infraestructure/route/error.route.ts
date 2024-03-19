import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { ErrorUseCase } from '../../application/errorUseCase'
import { ErrorController } from '../controller/error.controller'

export const ErrorRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new ErrorUseCase(Repository)
const Controller = new ErrorController(UseCase)

ErrorRouter.get('/', Controller.getAllError)
ErrorRouter.post('/', Controller.createError)

ErrorRouter.get('/:id', Controller.findError)
ErrorRouter.delete('/:id', Controller.deleteError)
