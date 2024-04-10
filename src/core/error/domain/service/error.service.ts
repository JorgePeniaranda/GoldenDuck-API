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

  public async findAll (): Promise<Error[] | null> {
    return await this.errorRepository.findAll()
  }

  public async findOne (id: ErrorPrimitive['id']): Promise<Error | null> {
    return await this.errorRepository.findOne(id)
  }

  public async delete (id: ErrorPrimitive['id']): Promise<void> {
    await this.errorRepository.delete(id)
  }
}
