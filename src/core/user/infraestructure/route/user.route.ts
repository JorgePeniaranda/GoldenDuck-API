import { Router } from 'express'
import UserController from '../controller/user.controller'
import UseruUseCase from '../../application/userUseCase'
import PrismaRepository from '../repository/prisma.repository'

export const UserRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new UseruUseCase(Repository)
const Controller = new UserController(UseCase)

UserRouter.get('/', () => Controller.getUser)

export default UserRouter
