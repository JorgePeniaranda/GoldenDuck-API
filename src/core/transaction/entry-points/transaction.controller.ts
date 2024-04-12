import { type JwtPayload } from '@/core/authentication/domain/payload.entity'
import { TransactionErrorsMessages } from '@/messages/error/transaction'
import {
  Body,
  Controller,
  Delete,
  Get,
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
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: TransactionPrimitive['id']
  ): Promise<Transaction[]> {
    const transactions = await this.readTransactionService.findAll(UserData.user.id, AccountIndex)

    return transactions
  }

  @Post()
  async create (
    @Request() UserData: { user: JwtPayload },
      @Param('index', new ParseIntPipe()) index: number,
      @Body() data: CreateTransactionDTO
  ): Promise<Transaction> {
    const transaction = await this.writeTransactionService.create(UserData.user.id, index, data)

    return transaction
  }

  @Get('/:index')
  async findOne (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOne(
      UserData.user.id,
      AccountIndex,
      index
    )

    if (transaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    return transaction
  }

  @Get('/send/:index')
  async findOneAsSender (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsSender(
      UserData.user.id,
      AccountIndex,
      index
    )

    if (transaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    return transaction
  }

  @Get('/received/:index')
  async findOneAsReceiver (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<Transaction> {
    const transaction = await this.readTransactionService.findOneAsReceiver(
      UserData.user.id,
      AccountIndex,
      index
    )

    if (transaction === null) {
      throw new NotFoundException(TransactionErrorsMessages.NotFound)
    }

    return transaction
  }

  @Delete('/:index')
  async delete (
    @Request() UserData: { user: JwtPayload },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeTransactionService.delete(UserData.user.id, AccountIndex, index)
  }
}
