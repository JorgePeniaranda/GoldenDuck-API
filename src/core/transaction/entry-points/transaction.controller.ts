import { type PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive'
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator'
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
import { ApiTags } from '@nestjs/swagger'
import { CreateTransactionDTO, SWGCreateTransactionDTO } from '../domain/dto/create-transaction'
import { ReadTransactionService } from '../domain/service/read-transaction.service'
import { WriteTransactionService } from '../domain/service/write-transaction.service'
import { type Transaction } from '../domain/transaction.entity'
import { TransactionResponse } from './transaction.response'

@ApiTags('Transaction')
@Controller('account/:AccountIndex/transaction')
export class TransactionController {
  constructor (
    private readonly readTransactionService: ReadTransactionService,
    private readonly writeTransactionService: WriteTransactionService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    isArray: true,
    status: 200
  })
  @Get()
  async findAll (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number
  ): Promise<Transaction[]> {
    const transactions = await this.readTransactionService.findAll({
      idUser: UserData.user.id,
      AccountIndex
    })

    return transactions
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    body: SWGCreateTransactionDTO,
    response: TransactionResponse,
    status: 201
  })
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

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    status: 200
  })
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

  /* ---------- findOneAsSender ---------- */ // MARK: findOneAsSender
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    status: 200
  })
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

  /* ---------- findOneAsReceiver ---------- */ // MARK: findOneAsReceiver
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    status: 200
  })
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

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    response: TransactionResponse,
    status: 204
  })
  @Delete('/:index')
  async delete (
    @Request() UserData: { user: PayloadPrimitive },
      @Param('AccountIndex', new ParseIntPipe()) AccountIndex: number,
      @Param('index', new ParseIntPipe()) index: number
  ): Promise<void> {
    await this.writeTransactionService.delete({ idUser: UserData.user.id, AccountIndex, index })
  }
}
