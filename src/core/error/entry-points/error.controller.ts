import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { ErrorErrorsMessages } from '@/messages/error/error'
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateErrorDTO, SWGCreateErrorDTO } from '../domain/dto/create-error'
import { type Error } from '../domain/error.entity'
import { type ErrorPrimitive } from '../domain/error.primitive'
import { ReadErrorService } from '../domain/service/read-error.service'
import { WriteErrorService } from '../domain/service/write-error.service'
import { ErrorResponse } from './error.response'

@ApiTags('Error')
@Controller('error')
export class ErrorController {
  constructor (
    private readonly writeErrorService: WriteErrorService,
    private readonly readErrorService: ReadErrorService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: ErrorResponse,
    isArray: true,
    status: 200
  })
  @Get()
  async findAll (): Promise<Error[]> {
    const errors = await this.readErrorService.findAll()

    return errors
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: false,
    body: SWGCreateErrorDTO,
    response: ErrorResponse,
    status: 200
  })
  @Post()
  async create (@Body() data: CreateErrorDTO): Promise<Error> {
    const error = await this.writeErrorService.create(data)

    return error
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: ErrorResponse,
    status: 200
  })
  @Get('/:id')
  async findOne (@Param('id', new ParseIntPipe()) id: ErrorPrimitive['id']): Promise<Error> {
    const error = await this.readErrorService.findOne({ id })

    if (error === null) {
      throw new NotFoundException(ErrorErrorsMessages.NotFound)
    }

    return error
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @Delete('/:id')
  async delete (@Param('id', new ParseIntPipe()) id: ErrorPrimitive['id']): Promise<void> {
    await this.writeErrorService.delete({ id })
  }
}
