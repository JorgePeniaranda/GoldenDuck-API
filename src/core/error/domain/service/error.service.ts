import { Inject, Injectable } from '@nestjs/common'
import { type CreateErrorDTO } from '../dto/create-error'
import { type Error } from '../error.entity'
import { type ErrorPrimitive } from '../error.primitive'
import { ErrorRepository } from '../error.repository'

@Injectable()
export class ErrorService {
  constructor (
    @Inject('ErrorRepository')
    private readonly errorRepository: ErrorRepository
  ) {}

  public async create (data: CreateErrorDTO): Promise<Error> {
    return await this.errorRepository.create(data)
  }

  public async getAll (): Promise<Error[] | null> {
    return await this.errorRepository.getAll()
  }

  public async find (id: ErrorPrimitive['id']): Promise<Error | null> {
    return await this.errorRepository.find(id)
  }

  public async delete (id: ErrorPrimitive['id']): Promise<void> {
    await this.errorRepository.delete(id)
  }
}
