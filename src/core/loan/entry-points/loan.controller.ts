import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { LoanErrorsMessages } from '@/messages/error/loan'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SWGCreateLoanDTO } from '../domain/dto/create-loan'
import { type Loan } from '../domain/loan.entity'
import { ReadLoanService } from '../domain/service/read-loan.service'
import { WriteLoanService } from '../domain/service/write-loan.service'
import { LoanResponse } from './loan.response'

@ApiResponse({
  type: LoanResponse
})
@ApiTags('Loan')
@ApiBearerAuth()
@Controller('account/:AccountIndex/loan')
export class LoanController {
  constructor (
    private readonly writeLoanService: WriteLoanService,
    private readonly readLoanService: ReadLoanService
  ) {}

  @Get()
  async findAll (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number
  ): Promise<Loan[]> {
    const loan = await this.readLoanService.findAll({
      idUser: UserData.user.id,
      AccountIndex
    })

    return loan
  }

  @Post()
  async create (@Body() data: SWGCreateLoanDTO): Promise<Loan> {
    const loan = await this.writeLoanService.create(data)

    return loan
  }

  @Get('/:index')
  async findOne (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Loan> {
    const loan = await this.readLoanService.findOne({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })

    if (loan === null) {
      throw new NotFoundException(LoanErrorsMessages.NotFound)
    }

    return loan
  }

  @HttpCode(204)
  @Delete('/:index')
  async delete (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeLoanService.delete({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })
  }
}
