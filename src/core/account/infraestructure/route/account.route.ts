import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { AccountUseCase } from '../../application/accountUseCase'
import { AccountController } from '../controller/account.controller'

export const AccountRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new AccountUseCase(Repository)
const Controller = new AccountController(UseCase)

AccountRouter.get('/', () => Controller.getUser)
