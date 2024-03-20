import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { CategoryUseCase } from '../../application/categoryUseCase'
import { CategoryController } from '../controller/category.controller'

export const CategoryRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new CategoryUseCase(Repository)
const Controller = new CategoryController(UseCase)

CategoryRouter.get('/', Controller.getAllCategory)
CategoryRouter.post('/', Controller.createCategory)

CategoryRouter.get('/:id', Controller.findCategory)
CategoryRouter.put('/:id', Controller.updateCategory)
CategoryRouter.delete('/:id', Controller.deleteCategory)
