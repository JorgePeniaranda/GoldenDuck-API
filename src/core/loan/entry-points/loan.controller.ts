import { EntitiesName } from '@/constants/entities'
import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { CurrentAPIUser } from '@/decorators/current-user.decorator'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
import { Messages } from '@/messages'
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
import { ApiTags } from '@nestjs/swagger'
import { CreateLoanDTO, SWGCreateLoanDTO } from '../domain/dto/create-loan'
import { type Loan } from '../domain/loan.entity'
import { ReadLoanService } from '../domain/service/read-loan.service'
import { WriteLoanService } from '../domain/service/write-loan.service'
import { LoanResponse } from './loan.response'

@ApiTags('Loan')
@Controller('account/:AccountIndex/loan')
export class LoanController {
  constructor (
    private readonly writeLoanService: WriteLoanService,
    private readonly readLoanService: ReadLoanService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: LoanResponse,
    isArray: true,
    status: 200
  })
  @Get()
  async findAll (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number
  ): Promise<Loan[]> {
    const loan = await this.readLoanService.findAll({
      idUser: UserData.id,
      AccountIndex
    })

    return loan
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    body: SWGCreateLoanDTO,
    response: LoanResponse,
    status: 204
  })
  @Post()
  async create (@Body() data: CreateLoanDTO): Promise<Loan> {
    const loan = await this.writeLoanService.create(data)

    return loan
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: LoanResponse,
    status: 200
  })
  @Get('/:index')
  async findOne (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Loan> {
    const loan = await this.readLoanService.findOne({
      idUser: UserData.id,
      AccountIndex,
      index
    })

    if (loan === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.LOAN))
    }

    return loan
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204
  })
  @HttpCode(204)
  @Delete('/:index')
  async delete (
    @CurrentAPIUser() UserData: PayloadPrimitive,
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeLoanService.delete({
      idUser: UserData.id,
      AccountIndex,
      index
    })
  }
}
