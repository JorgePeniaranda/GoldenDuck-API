import { ErrorErrorsMessages } from '@/messages/error/error'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type CreateErrorDTO } from '../dto/create-error'
import { Error } from '../error.entity'
import { type ErrorPrimitive } from '../error.primitive'
import { ErrorRepository } from '../error.repository'

@Injectable()
export class WriteErrorService {
  constructor (
    @Inject('ErrorRepository')
    private readonly errorRepository: ErrorRepository
  ) {}

  public async create (data: CreateErrorDTO): Promise<Error> {
    const error = Error.create(data)

    return await this.errorRepository.create(error)
  }

  public async delete ({ id }: { id: ErrorPrimitive['id'] }): Promise<void> {
    const error = await this.errorRepository.findOne({ id })

    if (error === null) {
      throw new NotFoundException(ErrorErrorsMessages.NotFound)
    }

    await this.errorRepository.delete(error)
  }
}
