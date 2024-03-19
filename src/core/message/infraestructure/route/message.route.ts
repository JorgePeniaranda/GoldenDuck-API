import { Router } from 'express'
import { PrismaRepository } from '../repository/prisma.repository'
import { MessageUseCase } from '../../application/messageUseCase'
import { MessageController } from '../controller/message.controller'

export const MessageRouter = Router()

const Repository = new PrismaRepository()
const UseCase = new MessageUseCase(Repository)
const Controller = new MessageController(UseCase)

MessageRouter.get('/', Controller.getAllConversations)
// MessageRouter.get('/', Controller.getConversationWith)
MessageRouter.post('/', Controller.createMessage)

MessageRouter.get('/:id', Controller.getMessage)
MessageRouter.delete('/:id', Controller.deleteMessage)
