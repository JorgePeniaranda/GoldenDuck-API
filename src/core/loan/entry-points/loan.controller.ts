import { type JwtPayload } from '@/core/authentication/domain/payload.entity'
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
import { CreateLoanDTO } from '../domain/dto/create-loan'
import { type Loan } from '../domain/loan.entity'
import { type LoanPrimitive } from '../domain/loan.primitive'
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
  async findAll (@Body() id: LoanPrimitive['id']): Promise<Loan[]> {
    const loan = await this.readLoanService.findAll(id)

    return loan
  }

  @Post()
  async create (@Body() data: CreateLoanDTO): Promise<Loan> {
    const loan = await this.writeLoanService.create(data)

    return loan
  }

  @Get('/:index')
  async findOne (
    @Request() UserData: { user: JwtPayload },
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
    @Request() UserData: { user: JwtPayload },
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
