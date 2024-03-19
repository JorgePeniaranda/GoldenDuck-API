import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { SessionUseCase } from '../../application/sessionUseCase'
import { SessionController } from '../controller/session.controller'

export const SessionRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new SessionUseCase(Repository)
const Controller = new SessionController(UseCase)

SessionRouter.get('/', Controller.getAllSession)
SessionRouter.post('/', Controller.registerSession)

SessionRouter.get('/:id', Controller.findSession)
