import { EntitiesName } from '@/constants/entities'
import { Public } from '@/decorators/public.decorator'
import { GqlAuthGuard } from '@/guard/gql.guard'
import { Messages } from '@/messages'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GQLCreateErrorDTO } from '../domain/dto/create-error'
import { Error } from '../domain/error.entity'
import { type ErrorPrimitive } from '../domain/error.primitive'
import { ReadErrorService } from '../domain/service/read-error.service'
import { WriteErrorService } from '../domain/service/write-error.service'

@Public()
@UseGuards(GqlAuthGuard)
@Resolver()
export class ErrorResolver {
  constructor (
    private readonly writeErrorService: WriteErrorService,
    private readonly readErrorService: ReadErrorService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @Query(() => Error, { name: 'find_all_error' })
  async findAll (): Promise<Error[]> {
    const errors = await this.readErrorService.findAll()

    return errors
  }

  /* ---------- create ---------- */ // MARK: create
  @Mutation(() => Error, { name: 'create_error' })
  async create (@Args('data') data: GQLCreateErrorDTO): Promise<Error> {
    const error = await this.writeErrorService.create(data)

    return error
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @Query(() => Error, { name: 'find_one_error' })
  async findOne (@Args('id', { type: () => Int }) id: ErrorPrimitive['id']): Promise<Error> {
    const error = await this.readErrorService.findOne({ id })

    if (error === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ERROR))
    }

    return error
  }

  /* ---------- delete ---------- */ // MARK: delete
  @Mutation(() => Error, { name: 'delete_error' })
  async delete (@Args('id', { type: () => Int }) id: ErrorPrimitive['id']): Promise<void> {
    await this.writeErrorService.delete({ id })
  }
}
