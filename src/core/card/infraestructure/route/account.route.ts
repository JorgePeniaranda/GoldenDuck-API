import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CardUseCase } from '../../application/accountUseCase'
import { CardController } from '../controller/card.controller'

export const AccountRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new CardUseCase(Repository)
const Controller = new CardController(UseCase)

AccountRouter.get('/', () => Controller.getCard)
