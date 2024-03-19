import { type ErrorEntity } from '../domain/error.entity'
import { type ErrorRepository } from '../domain/error.repository'
import { type Error } from '../domain/error.value'

export class ErrorUseCase {
  constructor (private readonly categoryRepository: ErrorRepository) {}

  public async createError ({ name, message }: { name: ErrorEntity['name'], message: ErrorEntity['message'] }): Promise<Error> {
    const createError = await this.categoryRepository.createError({ name, message })

    return createError
  }

  public async getAllError (): Promise<Error[] | null> {
    const AllCategories = await this.categoryRepository.getAllError()

    return AllCategories
  }

  public async findError ({ id }: { id: ErrorEntity['id'] }): Promise<Error | null> {
    const category = await this.categoryRepository.findError({ id })

    return category
  }

  public async deleteError ({ id }: { id: ErrorEntity['id'] }): Promise<void> {
    await this.categoryRepository.deleteError({ id })
  }
}
