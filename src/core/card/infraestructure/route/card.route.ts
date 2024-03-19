import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CardUseCase } from '../../application/cardUseCase'
import { CardController } from '../controller/card.controller'

export const CardRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new CardUseCase(Repository)
const Controller = new CardController(UseCase)

CardRouter.get('/', Controller.getAllCard)
CardRouter.post('/', Controller.createCard)

CardRouter.get('/:id', Controller.getCard)
CardRouter.delete('/:id', Controller.deleteCard)
