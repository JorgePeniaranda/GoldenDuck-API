import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateLoanDTO } from '../domain/dto/create-loan'
import { type Loan } from '../domain/loan.entity'
import { type LoanPrimitive } from '../domain/loan.primitive'
import { LoanService } from '../domain/service/loan.service'
import { LoanResponse } from './loan.response'

@ApiResponse({
  type: LoanResponse
})
@ApiTags('Loan')
@Controller('loan')
export class LoanController {
  constructor (private readonly loanService: LoanService) {}

  @Get()
  async getAllLoan (@Body() id: LoanPrimitive['id']): Promise<Loan[]> {
    const loans = await this.loanService.getAll(id)

    if (loans === null) {
      return []
    }

    return loans
  }

  @Post()
  async createLoan (@Body() data: CreateLoanDTO): Promise<Loan> {
    const loan = await this.loanService.create(data)

    return loan
  }

  @Get('/:id')
  async getLoan (@Param('id', new ParseIntPipe()) id: LoanPrimitive['id']): Promise<Loan> {
    const loan = await this.loanService.find(id)

    if (loan === null) {
      throw new NotFoundException()
    }

    return loan
  }

  @Delete('/:id')
  async deleteLoan (@Param('id', new ParseIntPipe()) id: LoanPrimitive['id']): Promise<void> {
    await this.loanService.delete(id)
  }
}
