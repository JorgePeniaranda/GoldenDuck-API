import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { NotificationUseCase } from '../../application/notificationUseCase'
import { NotificationController } from '../controller/notification.controller'

export const NotificationRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new NotificationUseCase(Repository)
const Controller = new NotificationController(UseCase)

NotificationRouter.get('/', Controller.getAllNotification)
NotificationRouter.post('/', Controller.createNotification)

NotificationRouter.get('/:id', Controller.findNotification)
NotificationRouter.delete('/:id', Controller.readNotification)
