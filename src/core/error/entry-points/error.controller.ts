import { Public } from '@/decorators/public.decorator'
import { ErrorErrorsMessages } from '@/messages/error/error'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SWGCreateErrorDTO } from '../domain/dto/create-error'
import { type Error } from '../domain/error.entity'
import { type ErrorPrimitive } from '../domain/error.primitive'
import { ReadErrorService } from '../domain/service/read-error.service'
import { WriteErrorService } from '../domain/service/write-error.service'
import { ErrorResponse } from './error.response'

@ApiResponse({
  type: ErrorResponse
})
@ApiTags('Error')
@Controller('error')
export class ErrorController {
  constructor (
    private readonly writeErrorService: WriteErrorService,
    private readonly readErrorService: ReadErrorService
  ) {}

  @ApiBearerAuth()
  @Get()
  async findAll (): Promise<Error[]> {
    const errors = await this.readErrorService.findAll()

    return errors
  }

  @Public()
  @Post()
  async create (@Body() data: SWGCreateErrorDTO): Promise<Error> {
    const error = await this.writeErrorService.create(data)

    return error
  }

  @ApiBearerAuth()
  @Get('/:id')
  async findOne (@Param('id', new ParseIntPipe()) id: ErrorPrimitive['id']): Promise<Error> {
    const error = await this.readErrorService.findOne({ id })

    if (error === null) {
      throw new NotFoundException(ErrorErrorsMessages.NotFound)
    }

    return error
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete('/:id')
  async delete (@Param('id', new ParseIntPipe()) id: ErrorPrimitive['id']): Promise<void> {
    await this.writeErrorService.delete({ id })
  }
}
