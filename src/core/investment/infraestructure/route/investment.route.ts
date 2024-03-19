import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { InvestmentUseCase } from '../../application/investmentUseCase'
import { InvestmentController } from '../controller/investment.controller'

export const InvestmentRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new InvestmentUseCase(Repository)
const Controller = new InvestmentController(UseCase)

InvestmentRouter.get('/', Controller.getAllInvestment)
InvestmentRouter.post('/', Controller.createInvestment)

InvestmentRouter.get('/:id', Controller.getInvestment)
InvestmentRouter.delete('/:id', Controller.cancelInvestment)
