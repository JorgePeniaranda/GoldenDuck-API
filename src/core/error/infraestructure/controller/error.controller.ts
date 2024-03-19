import { type Request, type Response } from 'express'
import { Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { type ErrorUseCase } from '../../application/errorUseCase'

export class ErrorController {
  constructor (private readonly cardUseCase: ErrorUseCase) {}

  public createError = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { name, message } = request.body

    const createdError = await this.cardUseCase.createError({
      name: new Alphabetic(String(name)),
      message: new Alphabetic(String(message))
    })

    return response.json(createdError).status(201)
  }

  public getAllError = async (
    _request: Request,
    response: Response
  ): Promise<Response> => {
    const categories = await this.cardUseCase.getAllError()

    if (categories === null) {
      response.status(404).send()
    }

    return response.json(categories).status(200)
  }

  public findError = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params

    const category = await this.cardUseCase.findError({
      id: new ID(Number(id))
    })

    if (category === null) {
      response.status(404).send()
    }

    return response.json(category).status(200)
  }

  public deleteError = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params

    await this.cardUseCase.deleteError({ id: new ID(Number(id)) })

    return response.json().status(204)
  }
}
