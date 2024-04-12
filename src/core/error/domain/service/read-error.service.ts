import { Inject, Injectable } from '@nestjs/common'
import { type Error } from '../error.entity'
import { type ErrorPrimitive } from '../error.primitive'
import { ErrorRepository } from '../error.repository'

@Injectable()
export class ReadErrorService {
  constructor (
    @Inject('ErrorRepository')
    private readonly errorRepository: ErrorRepository
  ) {}

  public async findAll (): Promise<Error[]> {
    return await this.errorRepository.findAll()
  }

  public async findOne ({ id }: { id: ErrorPrimitive['id'] }): Promise<Error | null> {
    return await this.errorRepository.findOne({ id })
  }
}
