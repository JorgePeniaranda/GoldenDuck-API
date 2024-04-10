import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateErrorDTO } from '../domain/dto/create-error'
import { type Error } from '../domain/error.entity'
import { type ErrorPrimitive } from '../domain/error.primitive'
import { ErrorService } from '../domain/service/error.service'
import { ErrorResponse } from './error.response'

@ApiResponse({
  type: ErrorResponse
})
@ApiTags('Error')
@Controller('error')
export class ErrorController {
  constructor (private readonly errorService: ErrorService) {}

  @Get()
  async getAllError (): Promise<Error[]> {
    const errors = await this.errorService.findAll()

    if (errors === null) {
      return []
    }

    return errors
  }

  @Post()
  async createError (@Body() data: CreateErrorDTO): Promise<Error> {
    const error = await this.errorService.create(data)

    return error
  }

  @Get('/:id')
  async getError (@Param('id', new ParseIntPipe()) id: ErrorPrimitive['id']): Promise<Error> {
    const error = await this.errorService.findOne(id)

    if (error === null) {
      throw new NotFoundException()
    }

    return error
  }

  @Delete('/:id')
  async deleteError (@Param('id', new ParseIntPipe()) id: ErrorPrimitive['id']): Promise<void> {
    await this.errorService.delete(id)
  }
}
