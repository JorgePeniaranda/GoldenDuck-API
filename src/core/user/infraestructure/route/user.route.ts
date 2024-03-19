import { Router } from 'express'
import { UserController } from '../controller/user.controller'
import { UserUseCase } from '../../application/userUseCase'
import { PrismaRepository } from '../repository/prisma.repository'

export const UserRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new UserUseCase(Repository)
const Controller = new UserController(UseCase)

UserRouter.get('/', Controller.getUser)
UserRouter.post('/', Controller.createUser)

UserRouter.get('/:id', Controller.getUser)
UserRouter.put('/', Controller.updateUser)
UserRouter.patch('/', Controller.updateUser)
UserRouter.delete('/', Controller.deleteUser)
