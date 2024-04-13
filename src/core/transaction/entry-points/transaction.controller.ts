import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { TransactionErrorsMessages } from '@/messages/error/transaction'
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
import { CreateTransactionDTO } from '../domain/dto/create-transaction'
import { ReadTransactionService } from '../domain/service/read-transaction.service'
import { WriteTransactionService } from '../domain/service/write-transaction.service'
import { type Transaction } from '../domain/transaction.entity'
import { type TransactionPrimitive } from '../domain/transaction.primitive'
import { TransactionResponse } from './transaction.response'

@ApiResponse({
  type: TransactionResponse
})
@ApiTags('Transaction')
@ApiBearerAuth()
@Controller('account/:AccountIndex/transaction')
export class TransactionController {
  constructor (
    private readonly readTransactionService: ReadTransactionService,
    private readonly writeTransactionService: WriteTransactionService
  ) {}

  @Get()
  async findAll (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: TransactionPrimitive['id']
  ): Promise<Transaction[]> {
    const transactions = await this.readTransactionService.findAll({
      idUser: UserData.user.id,
      AccountIndex
    })

    return transactions
  }

  @Post()
  async create (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Body() data: CreateTransactionDTO
  ): Promise<Transaction> {
    const transaction = await this.writeTransactionService.create({
      idUser: UserData.user.id,
      AccountIndex,
      data
    })

    return transaction
  }

  @Get('/:index')
  async findOne (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOne({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    return transaction
  }

  @Get('/send/:index')
  async findOneAsSender (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsSender({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    return transaction
  }

  @Get('/received/:index')
  async findOneAsReceiver (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsReceiver({
      idUser: UserData.user.id,
      AccountIndex,
      index
    })

    if (transaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    return transaction
  }

  @HttpCode(204)
  @Delete('/:index')
  async delete (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeTransactionService.delete({ idUser: UserData.user.id, AccountIndex, index })
  }
}
