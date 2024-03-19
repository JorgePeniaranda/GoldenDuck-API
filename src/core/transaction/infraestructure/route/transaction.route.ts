import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { TransactionUseCase } from '../../application/transactionUseCase'
import { TransactionController } from '../controller/transaction.controller'

export const TransactionRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new TransactionUseCase(Repository)
const Controller = new TransactionController(UseCase)

TransactionRouter.get('/', Controller.getAllTransaction)
TransactionRouter.post('/', Controller.createTransaction)

TransactionRouter.get('/:id', Controller.findTransaction)
TransactionRouter.delete('/:id', Controller.revertTransaction)
