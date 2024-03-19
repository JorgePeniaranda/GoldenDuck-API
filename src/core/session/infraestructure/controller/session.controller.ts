import { type Request, type Response } from 'express'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { type SessionUseCase } from '../../application/sessionUseCase'
import { ValidString } from '@/valueObjects/string/string/String.value'

export class SessionController {
  constructor (private readonly sessionUseCase: SessionUseCase) {}

  public registerSession = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { idUser, ip, userAgent } = request.body

    const createdSession = await this.sessionUseCase.registerSession({
      idUser: new ID(Number(idUser)),
      ip: new ValidString(String(ip)),
      userAgent: new ValidString(String(userAgent))
    })

    return response.json(createdSession).status(201)
  }

  public getAllSession = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { idUser } = request.params

    const AllSessions = await this.sessionUseCase.getAllSession(
      new ID(Number(idUser))
    )

    if (AllSessions === null) {
      response.status(404).send()
    }

    return response.json(AllSessions).status(200)
  }

  public findSession = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params

    const session = await this.sessionUseCase.findSession({
      id: new ID(Number(id))
    })

    if (session === null) {
      response.status(404).send()
    }

    return response.json(session).status(200)
  }
}
