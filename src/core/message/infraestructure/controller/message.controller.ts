import { type Request, type Response } from 'express'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { type MessageUseCase } from '../../application/messageUseCase'
import { ValidString } from '@/valueObjects/string/string/String.value'

export class MessageController {
  constructor (private readonly messageUseCase: MessageUseCase) {}

  public createMessage = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { from, to, message: userMessage } = request.query

    const message = await this.messageUseCase.createMessage({
      from: new ID(Number(from)),
      to: new ID(Number(to)),
      message: new ValidString(String(userMessage))
    })

    if (message === null) {
      return response.status(404).send()
    }

    return response.json(message?.id).status(200)
  }

  public getMessage = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const message = await this.messageUseCase.findMessage({
      id: typeof id === 'string' ? new ID(Number(id)) : undefined
    })

    if (message === null) {
      return response.status(404).send()
    }

    return response.json(message?.id).status(200)
  }

  public getAllConversations = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const messages = await this.messageUseCase.getAllConversations(
      new ID(Number(id))
    )

    if (messages === null) {
      return response.status(404).send()
    }

    const messagesToJson = messages.map((message) => {
      return message.toJSON()
    })

    return response.json(messagesToJson).status(200)
  }

  public getConversationWith = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    const messages = await this.messageUseCase.getConversationWith(
      new ID(Number(id))
    )

    if (messages === null) {
      return response.status(404).send()
    }

    const messagesToJson = messages.map((message) => {
      return message.toJSON()
    })

    return response.json(messagesToJson).status(200)
  }

  public deleteMessage = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.query

    await this.messageUseCase.deleteMessage(new ID(Number(id)))

    return response.json().status(204)
  }
}
