import { Router } from 'express'
import UserController from '../controller/user.controller'

export const UserRouter = Router()

const Controller = new UserController()

UserRouter.get('/', () => Controller.getUser)

export default UserRouter
