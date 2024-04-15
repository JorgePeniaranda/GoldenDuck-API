import { EntitiesName } from '@/constants/entities'
import { Messages } from '@/messages'
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

  /* ---------- create ---------- */ // MARK: create
  public async create (data: CreateErrorDTO): Promise<Error> {
    const error = Error.create(data)

    return await this.errorRepository.create(error)
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete ({ id }: { id: ErrorPrimitive['id'] }): Promise<void> {
    const error = await this.errorRepository.findOne({ id })

    if (error === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ERROR))
    }

    await this.errorRepository.delete(error)
  }
}
