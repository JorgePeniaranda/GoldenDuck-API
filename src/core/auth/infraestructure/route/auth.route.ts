import { Router } from 'express'
import { PrismaRepository } from '@/core/user/infraestructure/repository/prisma.repository'
import { AuthUseCase } from '../../application/authUseCase'
import { AuthController } from '../controller/auth.controller'

export const AuthRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new AuthUseCase(Repository)
const Controller = new AuthController(UseCase)

AuthRouter.get('/login', Controller.login)
