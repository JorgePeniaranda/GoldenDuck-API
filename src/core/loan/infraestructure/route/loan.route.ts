import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { LoanUseCase } from '../../application/loanUseCase'
import { LoanController } from '../controller/loan.controller'

export const LoanRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new LoanUseCase(Repository)
const Controller = new LoanController(UseCase)

LoanRouter.get('/', Controller.getAllLoan)
LoanRouter.post('/', Controller.createLoan)

LoanRouter.get('/:id', Controller.getLoan)
LoanRouter.delete('/:id', Controller.cancelLoan)
