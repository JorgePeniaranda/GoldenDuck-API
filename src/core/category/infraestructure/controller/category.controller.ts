import { type Request, type Response } from 'express'
import { type CategoryUseCase } from '../../application/categoryUseCase'
import { Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'
import { ID } from '@/valueObjects/number/ID/ID.value'

export class CategoryController {
  constructor (private readonly cardUseCase: CategoryUseCase) {}

  public createCategory = async (request: Request, response: Response): Promise<Response> => {
    const { name } = request.body

    const createdCategory = await this.cardUseCase.createCategory({ name: new Alphabetic(String(name)) })

    return response.json(createdCategory).status(201)
  }

  public getAllCategory = async (_request: Request, response: Response): Promise<Response> => {
    const categories = await this.cardUseCase.getAllCategory()

    if (categories === null) {
      response.status(404).send()
    }

    return response.json(categories).status(200)
  }

  public findCategory = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params

    const category = await this.cardUseCase.findCategory({ id: new ID(Number(id)) })

    if (category === null) {
      response.status(404).send()
    }

    return response.json(category).status(200)
  }

  public updateCategory = async (request: Request, response: Response): Promise<Response> => {
    const { id, name } = request.body

    const updatedCategory = await this.cardUseCase.updateCategory({ id: new ID(Number(id)), name: new Alphabetic(String(name)) })

    return response.json(updatedCategory).status(200)
  }

  public deleteCategory = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params

    await this.cardUseCase.deleteCategory({ id: new ID(Number(id)) })

    return response.json().status(204)
  }
}
