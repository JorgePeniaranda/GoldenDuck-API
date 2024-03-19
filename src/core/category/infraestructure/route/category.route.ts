import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CategoryUseCase } from '../../application/categoryUseCase'
import { CategoryController } from '../controller/category.controller'

export const CardRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new CategoryUseCase(Repository)
const Controller = new CategoryController(UseCase)

CardRouter.get('/', Controller.getAllCategory)
CardRouter.post('/', Controller.createCategory)

CardRouter.get('/:id', Controller.findCategory)
CardRouter.put('/:id', Controller.updateCategory)
CardRouter.delete('/:id', Controller.deleteCategory)
