import { type Request, type Response } from 'express'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { ValidString } from '@/valueObjects/string/string/String.value'
import { type NotificationUseCase } from '../../application/notificationUseCase'

export class NotificationController {
  constructor (private readonly notificationUseCase: NotificationUseCase) {}

  public createNotification = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { idAccount, message } = request.query

    const notification = await this.notificationUseCase.createNotification({
      idAccount: new ID(Number(idAccount)),
      message: new ValidString(String(message))
    })

    if (notification === null) {
      return response.status(404).send()
    }

    return response.json(notification?.id).status(200)
  }

  public getAllNotification = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { idAccount } = request.query

    const notifications = await this.notificationUseCase.getAllNotification(
      new ID(Number(idAccount))
    )

    if (notifications === null) {
      return response.status(404).send()
    }

    return response.json(notifications).status(200)
  }

  public findNotification = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params

    const notification = await this.notificationUseCase.findNotification({
      id: new ID(Number(id))
    })

    if (notification === null) {
      return response.status(404).send()
    }

    return response.json(notification).status(200)
  }

  public readNotification = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params

    await this.notificationUseCase.readNotification(
      new ID(Number(id))
    )

    return response.status(204).send()
  }
}
